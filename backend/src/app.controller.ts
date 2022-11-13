import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessAuthGuard } from './infrastructure';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AccessAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
