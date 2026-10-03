import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * In-memory sliding window rate limiter
 * @param windowMs Window in milliseconds (e.g. 15 * 60 * 1000 = 15 mins)
 * @param maxRequests Maximum allowed requests per window
 * @param message Custom error message
 */
export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000,
  maxRequests: number = 100,
  message: string = 'Too many requests from this IP, please try again later.'
) => {
  const store: RateLimitStore = {};

  // Periodic cleanup every 5 minutes to avoid memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const ip in store) {
      if (store[ip].resetTime <= now) {
        delete store[ip];
      }
    }
  }, 5 * 60 * 1000);

  return (req: Request, res: Response, next: NextFunction): void => {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const now = Date.now();
    const entry = store[ip];

    if (!entry || entry.resetTime <= now) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      return next();
    }

    if (entry.count >= maxRequests) {
      const retryAfterSec = Math.ceil((entry.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.status(429).json({
        success: false,
        error: message,
        retryAfter: retryAfterSec,
      });
      return;
    }

    entry.count += 1;
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - entry.count);
    next();
  };
};

/**
 * Security HTTP headers middleware
 */
export const securityHeaders = (_req: Request, res: Response, next: NextFunction): void => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS protection for older browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Remove X-Powered-By to prevent fingerprinting
  res.removeHeader('X-Powered-By');
  next();
};

/**
 * API Protection Guard for sensitive / Admin endpoints (e.g. Apify runs & syncs)
 */
export const verifyApiKeyOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] || req.headers['x-api-key'];
  const token = typeof authHeader === 'string' ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';

  const expectedSecret = process.env.ADMIN_SECRET_KEY || process.env.APIFY_API_TOKEN;

  // In development mode without set keys, allow local access
  if (!expectedSecret) {
    return next();
  }

  if (!token || token !== expectedSecret) {
    res.status(403).json({
      success: false,
      error: 'Forbidden: Valid authorization token or API key required to access this resource',
    });
    return;
  }

  next();
};
