import crypto from 'crypto';

export const generateId = (): string => {
  return crypto.randomUUID();
};

export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(`${salt}:${key.toString('hex')}`);
    });
  });
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const [salt, key] = hash.split(':');
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
};

export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const parseDate = (dateStr: string): Date => {
  return new Date(dateStr);
};
