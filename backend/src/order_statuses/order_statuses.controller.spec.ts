import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusesController } from './order_statuses.controller';
import { OrderStatusesService } from './order_statuses.service';

describe('OrderStatusesController', () => {
  let controller: OrderStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStatusesController],
      providers: [OrderStatusesService],
    }).compile();

    controller = module.get<OrderStatusesController>(OrderStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
