import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { escapeRegex, isValidEmail, sanitizeText } from '../utils/security';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      guestEmail,
      guestName,
      shippingAddress,
      paymentMethod,
      items,
      subtotal,
      tax = 0,
      shippingFee = 0,
      discount = 0,
      totalAmount,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !shippingAddress) {
      res.status(400).json({ success: false, message: 'Missing required order items or shipping details' });
      return;
    }

    const cleanEmail = typeof guestEmail === 'string' && isValidEmail(guestEmail)
      ? guestEmail.trim().toLowerCase()
      : 'guest@kheoo.com';

    const cleanName = sanitizeText(guestName || 'Online Shopper').slice(0, 100);

    // Validate and sanitize order items
    const validatedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const pId = item.productId || item.id;
      const quantity = Math.max(1, Math.min(50, parseInt(item.quantity, 10) || 1));
      let price = parseFloat(item.price);

      // Verify price against product in database if ID is valid
      if (pId && mongoose.Types.ObjectId.isValid(pId)) {
        const dbProduct = await Product.findById(pId);
        if (dbProduct) {
          price = dbProduct.price;
        }
      }

      calculatedSubtotal += price * quantity;

      validatedItems.push({
        productId: pId || '',
        productName: sanitizeText(item.name || item.productName || 'Streetwear Item').slice(0, 150),
        price: Math.max(0, price),
        quantity,
        size: sanitizeText(item.size || 'L').slice(0, 10),
        color: sanitizeText(item.color || 'Black').slice(0, 30),
        image: typeof item.image === 'string' ? item.image : item.images?.[0] || '',
      });
    }

    const orderNumber = `KHEOO-WEB-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const numSubtotal = Math.max(0, parseFloat(subtotal) || calculatedSubtotal);
    const numTax = Math.max(0, parseFloat(tax) || 0);
    const numShipping = Math.max(0, parseFloat(shippingFee) || 0);
    const numDiscount = Math.max(0, parseFloat(discount) || 0);
    const numTotal = Math.max(0, parseFloat(totalAmount) || (numSubtotal + numTax + numShipping - numDiscount));

    const order = await Order.create({
      orderNumber,
      guestEmail: cleanEmail,
      guestName: cleanName,
      customerName: cleanName,
      customerPhone: '',
      shippingAddress: typeof shippingAddress === 'string' ? sanitizeText(shippingAddress) : JSON.stringify(shippingAddress),
      paymentMethod: paymentMethod || 'Cash On Delivery',
      paymentStatus: paymentMethod === 'Stripe Card' || paymentMethod === 'SSLCommerz' ? 'PAID' : 'PENDING',
      orderSource: 'ONLINE',
      subtotal: numSubtotal,
      tax: numTax,
      shippingFee: numShipping,
      discount: numDiscount,
      totalAmount: numTotal,
      status: 'PENDING',
      items: validatedItems,
    });

    // Deduct stock for ordered items
    for (const item of items) {
      const pId = item.productId || item.id;
      const qty = parseInt(item.quantity, 10) || 1;
      const size = item.size || 'L';

      if (pId) {
        await Product.findOneAndUpdate(
          { _id: pId, 'variants.size': size },
          {
            $inc: {
              stock: -qty,
              'variants.$.stock': -qty,
            },
          }
        ).catch(() => {
          // fallback to only decrementing total stock
          Product.findByIdAndUpdate(pId, { $inc: { stock: -qty } });
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Error creating order in MongoDB:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

// POS Order creation with instant inventory deduction & receipt generation
export const createPosOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName = 'Walk-in Customer',
      customerPhone = '',
      items,
      subtotal,
      tax = 0,
      discount = 0,
      totalAmount,
      paymentMethod = 'Cash',
      cashReceived = 0,
      changeAmount = 0,
      notes = '',
    } = req.body;

    if (!items || !items.length || totalAmount === undefined) {
      res.status(400).json({ success: false, message: 'Please add items to cart before completing sale' });
      return;
    }

    const orderNumber = `POS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const parsedItems = items.map((item: any) => ({
      productId: item.productId || item.id || item._id,
      productName: item.name || item.productName,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity, 10),
      size: item.size || 'L',
      color: item.color || 'Black',
      image: item.image || item.images?.[0] || '',
    }));

    const order = await Order.create({
      orderNumber,
      guestEmail: customerPhone ? `${customerPhone}@pos.kheoo.com` : 'pos@kheoo.com',
      guestName: customerName,
      customerName,
      customerPhone,
      shippingAddress: 'In-Store Counter / POS',
      paymentMethod,
      paymentStatus: 'PAID',
      orderSource: 'POS',
      subtotal: parseFloat(subtotal),
      tax: parseFloat(tax),
      shippingFee: 0,
      discount: parseFloat(discount),
      totalAmount: parseFloat(totalAmount),
      cashReceived: parseFloat(cashReceived),
      changeAmount: parseFloat(changeAmount),
      notes,
      status: 'DELIVERED', // In-store sales are handed over immediately
      items: parsedItems,
    });

    // Real-time stock update for each item sold in POS
    for (const item of parsedItems) {
      if (item.productId && mongoose.Types.ObjectId.isValid(item.productId)) {
        try {
          const product = await Product.findById(item.productId);
          if (product) {
            // Decrement total stock
            product.stock = Math.max(0, product.stock - item.quantity);

            // Decrement variant stock if variant exists
            if (product.variants && product.variants.length > 0) {
              const variantIndex = product.variants.findIndex(
                (v) => v.size.toLowerCase() === item.size.toLowerCase()
              );
              if (variantIndex > -1) {
                product.variants[variantIndex].stock = Math.max(
                  0,
                  product.variants[variantIndex].stock - item.quantity
                );
              }
            }

            await product.save();
          }
        } catch (err) {
          console.warn(`Could not update stock for product ${item.productId}:`, err);
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'POS Order completed successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Error creating POS order:', error);
    res.status(500).json({ success: false, message: 'Failed to process POS sale' });
  }
};

// Get list of orders with filters (for Dashboard & POS History)
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { source, status, search, limit = '20', page = '1' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};

    if (source && source !== 'ALL') {
      query.orderSource = source;
    }

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const safeSearch = escapeRegex(search.trim().slice(0, 100));
      query.$or = [
        { orderNumber: { $regex: safeSearch, $options: 'i' } },
        { guestName: { $regex: safeSearch, $options: 'i' } },
        { customerName: { $regex: safeSearch, $options: 'i' } },
        { customerPhone: { $regex: safeSearch, $options: 'i' } },
        { guestEmail: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Order.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

// Get Dashboard & POS statistics
export const getOrderStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [totalOrders, posOrders, onlineOrders, allOrdersList, lowStockProducts] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderSource: 'POS' }),
      Order.countDocuments({ orderSource: 'ONLINE' }),
      Order.find({}, 'totalAmount orderSource createdAt status'),
      Product.countDocuments({ stock: { $lte: 10 } }),
    ]);

    const totalRevenue = allOrdersList.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const posRevenue = allOrdersList
      .filter((ord) => ord.orderSource === 'POS')
      .reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const onlineRevenue = allOrdersList
      .filter((ord) => ord.orderSource === 'ONLINE')
      .reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayOrders = allOrdersList.filter(
      (ord) => new Date((ord as any).createdAt) >= todayStart
    );
    const todaySales = todayOrders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const todayPosSales = todayOrders
      .filter((ord) => ord.orderSource === 'POS')
      .reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

    res.json({
      success: true,
      data: {
        totalRevenue,
        posRevenue,
        onlineRevenue,
        totalOrders,
        posOrders,
        onlineOrders,
        todaySales,
        todayPosSales,
        todayOrderCount: todayOrders.length,
        lowStockCount: lowStockProducts,
      },
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch sales statistics' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    const query = isObjectId ? { $or: [{ _id: id }, { orderNumber: id }] } : { orderNumber: id };

    const order = await Order.findOne(query);

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    console.error('Error fetching order from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

