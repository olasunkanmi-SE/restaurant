import { throwApplicationError } from './../infrastructure/utilities/exception-instance';
import { OrderManagerDocument } from './../infrastructure/data_access/repositories/schemas/order-manger.schema';
import { OrderManager } from './../order_manager/order.manager';
import { SingleClient } from './../singleclient/singleclient';
import { IValidateUser } from './context-validation.interface';
import { Result } from './../domain/result/result';
import { GenericDocumentRepository, SingleClientDocument } from './../infrastructure';
import { HttpStatus } from '@nestjs/common';

type Document = SingleClientDocument | OrderManagerDocument;
type Domain = SingleClient | OrderManager;
export class ValidateUser implements IValidateUser<Domain, Document> {
  async getUser(
    model: GenericDocumentRepository<Domain, Document>,
    props: { email: string; role?: string },
  ): Promise<boolean> {
    const { email, role } = props;
    let user: Result<any>;
    if (Object.hasOwnProperty.call(props, 'email')) {
      user = await model.findOne({ email });
    } else {
      user = await model.findOne({ role });
    }
    if (!user.isSuccess) {
      throwApplicationError(HttpStatus.FORBIDDEN, 'Invalid User');
    }
    return Boolean(user.isSuccess);
  }
}
