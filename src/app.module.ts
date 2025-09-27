import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewProductsModule } from './new_products/new_products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:CUfAFkwsSsZsYHLoFnsopOYgpDPpRKFi@hopper.proxy.rlwy.net:39398/railway',
      autoLoadEntities: true, 
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    NewProductsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
