import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderProcessingQueueDTO } from './create-order_processing_queue.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderProcessingQueueDTO) {}
