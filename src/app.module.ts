import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewProductsModule } from './new_products/new_products.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './infra/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      ignoreEnvFile: false,
    }),
    FirebaseModule,
    NewProductsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
