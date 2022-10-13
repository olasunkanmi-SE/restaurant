import { ValidationPipe } from '@nestjs/common';
export const validatePipeInstance = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
