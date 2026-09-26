import { Request, Response } from 'express';
import { User } from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password, // In production you can hash with bcrypt
      phone: phone || '',
      role: 'customer',
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.password !== password) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { googleId, name, email, avatar } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: 'Google email is required' });
      return;
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        googleId,
        avatar: avatar || '',
        role: 'customer',
      });
    } else if (googleId && !user.googleId) {
      user.googleId = googleId;
      if (avatar && !user.avatar) user.avatar = avatar;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Google login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Error in googleAuth:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};
