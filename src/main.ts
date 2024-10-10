import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Removes non-whitelisted properties from input
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are sent
    transform: true, // Automatically transform payloads to the expected types
  }));

  await app.listen(3000);
}
bootstrap();
