import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from './crypto_service.service';

@Global()
@Module({
  imports: [ConfigModule], // pra pegar o ENCRYPTION_SECRET
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CommonModule {}
