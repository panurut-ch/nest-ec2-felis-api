import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Create an instance of ConfigService
  app.enableCors();
  await app.listen(configService.get('PORT') || 3001); // Use a default port if PORT is not defined in your configuration
}

bootstrap();
