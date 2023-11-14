import { Audit, Entity, Result } from 'src/domain';
import { Types } from 'mongoose';
import { IOrderProcessingQueue } from './interface/order_processing_queue.interface';

/**
 * The OrderProcessingQueues domain Class
 *
 * @export
 * @class OrderProcessingQueues
 * @extends {Entity<IOrderProcessingQueues>}
 */
export class OrderProcessingQueue extends Entity<IOrderProcessingQueue> implements IOrderProcessingQueue {
  private _orderId: Types.ObjectId;
  private _orderStatusId: Types.ObjectId;
  private _audit: Audit;

  /**
   * Creates an instance of OrderProcessingQueues.
   * @param {OrderProcessingQueues} props
   * @memberof OrderProcessingQueues
   */
  private constructor(props: IOrderProcessingQueue, id?: Types.ObjectId) {
    super(id);
    this._orderId = props.orderId;
    this._orderStatusId = props.orderStatusId;
    this._audit = props.audit;
  }

  get orderStatusId(): Types.ObjectId {
    return this._orderStatusId;
  }

  get orderId(): Types.ObjectId {
    return this._orderId;
  }

  get audit() {
    return this._audit;
  }

  /**
   * Creates and initializes object for the OrderProcessingQueues Class
   *
   * @static
   * @param {IOrderProcessingQueues} props
   * @returns {Result<OrderProcessingQueues>}
   * @memberof OrderProcessingQueues
   */
  public static create(props: IOrderProcessingQueue, id?: Types.ObjectId): OrderProcessingQueue {
    return Result.ok(new OrderProcessingQueue(props, id)).getValue();
  }
}
