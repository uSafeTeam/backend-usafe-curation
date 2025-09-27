import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: false,
    }),
  );
  const port = Number(process.env.PORT) || 8080;
  console.log('🚀 Boot iniciando | PORT=', process.env.PORT);
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Server ouvindo em http://0.0.0.0:${port}`);
}
bootstrap();
