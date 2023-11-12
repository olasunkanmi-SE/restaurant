import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './create-order_status.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {}
