import { Audit, Entity, Result } from 'src/domain';
import { Types } from 'mongoose';
import { IOrderNote } from './interface/order-note.interface';

/**
 * The OrderNotes domain Class
 *
 * @export
 * @class OrderNotes
 * @extends {Entity<IOrderNotes>}
 */
export class OrderNote extends Entity<IOrderNote> {
  private _orderId: Types.ObjectId;
  private _note: string;
  private _audit: Audit;
  private _menuId: Types.ObjectId;

  /**
   * Creates an instance of OrderNotes.
   * @param {OrderNotes} props
   * @memberof OrderNotes
   */
  private constructor(props: IOrderNote, id?: Types.ObjectId) {
    super(id);
    this._orderId = props.orderId;
    this._note = props.note;
    this._audit = props.audit;
    this._menuId = props.menuId;
  }

  get note(): string {
    return this._note;
  }

  set note(note: string) {
    this._note = note;
  }

  get orderId(): Types.ObjectId {
    return this._orderId;
  }

  get menuId(): Types.ObjectId {
    return this._menuId;
  }

  get audit() {
    return this._audit;
  }

  /**
   * Creates and initializes object for the OrderNotes Class
   *
   * @static
   * @param {IOrderNotes} props
   * @returns {Result<OrderNotes>}
   * @memberof OrderNotes
   */
  public static create(props: IOrderNote, id?: Types.ObjectId): OrderNote {
    return Result.ok(new OrderNote(props, id)).getValue();
  }
}
