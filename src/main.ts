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
  const port = parseInt(process.env.PORT || '', 10) || 8080;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
