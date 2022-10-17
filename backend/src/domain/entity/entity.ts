import { ObjectId, Types } from 'mongoose';

export class Entity {
  protected readonly _id: Types.ObjectId;
  constructor(id: Types.ObjectId) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
