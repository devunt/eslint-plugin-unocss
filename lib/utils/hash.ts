import crypto from 'crypto';

export const hash = (str: string) => crypto.createHash('sha256').update(str).digest('hex');
