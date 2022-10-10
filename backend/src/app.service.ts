import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException(
      'A user has already been created with this email address',
      HttpStatus.BAD_REQUEST,
    );
  }
}
