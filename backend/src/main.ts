import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatePipeInstance } from './infrastructure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(validatePipeInstance);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
