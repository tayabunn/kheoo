import { Request, Response } from 'express';
import { Order } from '../models/Order';

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

    if (!items || !items.length || !shippingAddress || !totalAmount) {
      res.status(400).json({ success: false, message: 'Missing required order details' });
      return;
    }

    const orderNumber = `KHEOO-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create({
      orderNumber,
      guestEmail,
      guestName,
      shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress),
      paymentMethod: paymentMethod || 'Cash On Delivery',
      subtotal: parseFloat(subtotal),
      tax: parseFloat(tax),
      shippingFee: parseFloat(shippingFee),
      discount: parseFloat(discount),
      totalAmount: parseFloat(totalAmount),
      items: items.map((item: any) => ({
        productId: item.productId || item.id,
        productName: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        size: item.size || 'L',
        color: item.color || 'Black',
        image: item.image || item.images?.[0] || '',
      })),
    });

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

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const order = await Order.findOne({
      $or: [{ _id: id }, { orderNumber: id }],
    });

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
