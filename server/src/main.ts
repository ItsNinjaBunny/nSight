import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE'
    ],
  });

  await app.listen(port, () => logger.log(`Server running on port ${port}`));
}
bootstrap();