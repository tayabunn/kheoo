import { Request, Response } from 'express';

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: 'Coupon code required' });
      return;
    }

    const cleanCode = (code as string).trim().toUpperCase();

    if (cleanCode === 'KHEOO10') {
      const discountAmount = subtotal ? (subtotal * 10) / 100 : 0;
      res.json({
        success: true,
        message: 'Coupon applied successfully',
        data: {
          code: 'KHEOO10',
          discountAmount,
          discountPercent: 10,
        },
      });
      return;
    }

    res.status(400).json({ success: false, message: 'Invalid or expired promo code' });
  } catch (error: any) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
