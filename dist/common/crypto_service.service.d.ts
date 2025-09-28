import { ConfigService } from '@nestjs/config';
export declare class CryptoService {
    private config;
    private readonly algorithm;
    private readonly key;
    constructor(config: ConfigService);
    encrypt(text: string): string;
    decrypt(payload: string): string;
}
