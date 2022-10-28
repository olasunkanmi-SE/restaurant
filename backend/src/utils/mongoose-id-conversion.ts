import { Types } from 'mongoose';

export class ConvertId {
  static convertObjectIdToString = (objectId: Types.ObjectId) => {
    return objectId.toString();
  };

  static convertStringToObjectId = (prop: string) => {
    return new Types.ObjectId(prop);
  };
}
