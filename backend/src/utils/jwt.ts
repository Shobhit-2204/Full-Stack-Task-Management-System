import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  userId: number;
  email: string;
}

const getJwtSecret = (key: string | undefined, name: string): Secret => {
  if (!key) {
    throw new Error(`${name} not configured in environment`);
  }
  return key as Secret;
};

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = getJwtSecret(process.env.JWT_SECRET, 'JWT_SECRET');
  const expiresIn = (process.env.ACCESS_TOKEN_EXPIRY ?? '15m') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = getJwtSecret(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET');
  const expiresIn = (process.env.REFRESH_TOKEN_EXPIRY ?? '7d') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    const secret = getJwtSecret(process.env.JWT_SECRET, 'JWT_SECRET');
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    const secret = getJwtSecret(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET');
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
