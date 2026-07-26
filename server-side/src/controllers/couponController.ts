import { Request, Response } from 'express';
import { Coupon } from '../models/Coupon';

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: 'Coupon code required' });
      return;
    }

    const cleanCode = (code as string).trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode });

    if (!coupon || !coupon.isActive) {
      res.status(400).json({ success: false, message: 'Invalid or expired promo code' });
      return;
    }

    if (subtotal && subtotal < coupon.minPurchase) {
      res.status(400).json({
        success: false,
        message: `Coupon requires a minimum purchase of $${coupon.minPurchase}`,
      });
      return;
    }

    let discountAmount = 0;
    if (coupon.discountPercent) {
      discountAmount = (subtotal * coupon.discountPercent) / 100;
    } else if (coupon.discountAmount) {
      discountAmount = coupon.discountAmount;
    }

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      data: {
        code: coupon.code,
        discountAmount,
        discountPercent: coupon.discountPercent,
      },
    });
  } catch (error: any) {
    console.error('Error validating coupon in MongoDB:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
