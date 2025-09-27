import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor(private config: ConfigService) {
    // sua chave secreta no env como hex de 32 bytes
    const secret = this.config.get<string>('ENCRYPTION_SECRET');
    if (!secret) {
      throw new Error('ENCRYPTION_SECRET is not defined in environment variables');
    }
    this.key = Buffer.from(secret, 'hex');
  }

  encrypt(text: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    // retorna IV + cipher em base64, separados por ":"
    return `${iv.toString('base64')}:${encrypted.toString('base64')}`;
  }

  decrypt(payload: string): string {
    const [ivB64, encryptedB64] = payload.split(':');
    const iv = Buffer.from(ivB64, 'base64');
    const encrypted = Buffer.from(encryptedB64, 'base64');
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  }
}