import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusesService } from './order_statuses.service';

describe('OrderStatusesService', () => {
  let service: OrderStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatusesService],
    }).compile();

    service = module.get<OrderStatusesService>(OrderStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
