import { Module } from '@nestjs/common';
import { NewProductsService } from './new_products.service';
import { NewProductsController } from './new_products.controller';
import { NewProduct } from './entity/new_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/crypto_service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([NewProduct]), ConfigModule],
  providers: [NewProductsService, CryptoService],
  controllers: [NewProductsController],
})
export class NewProductsModule {}
