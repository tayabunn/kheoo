import { Request, Response } from 'express';

const MOCK_ORDERS: any[] = [];

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

    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      guestEmail,
      guestName,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash On Delivery',
      subtotal: parseFloat(subtotal),
      tax: parseFloat(tax),
      shippingFee: parseFloat(shippingFee),
      discount: parseFloat(discount),
      totalAmount: parseFloat(totalAmount),
      items,
      createdAt: new Date().toISOString(),
    };

    MOCK_ORDERS.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const order = MOCK_ORDERS.find((o) => o.id === id || o.orderNumber === id);

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
