import { Injectable } from '@nestjs/common';
import { Context } from './../infrastructure/context/context';
import { IContextService } from './../infrastructure/context/context-service.interface';
@Injectable()
export class OrderManagerService {
  private context: Promise<Context>;
  constructor(private readonly contextService: IContextService) {
    this.context = this.contextService.getContext();
  }
}
