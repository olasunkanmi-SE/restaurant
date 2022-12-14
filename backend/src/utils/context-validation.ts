import { Merchant } from './../merchant/merchant';
import { IValidateUser } from './context-validation.interface';
import { Result } from './../domain/result/result';
import { GenericDocumentRepository, MerchantDocument } from './../infrastructure';

export class ValidateUser implements IValidateUser {
  async getUser(
    model: GenericDocumentRepository<Merchant, MerchantDocument>,
    props: { email: string; role?: string },
  ): Promise<boolean> {
    const { email, role } = props;
    let user: Result<any>;
    if (Object.hasOwnProperty.call(props, 'email')) {
      user = await model.findOne({ email });
    } else {
      user = await model.findOne({ role });
    }
    return Boolean(user.isSuccess);
  }
}
