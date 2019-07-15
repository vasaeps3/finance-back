import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
