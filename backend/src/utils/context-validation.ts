import { IValidateUser } from './context-validation.interface';
import { Result } from './../domain/result/result';
import { GenericDocumentRepository } from './../infrastructure';

export class ValidateUser implements IValidateUser {
  async getUser(
    model: GenericDocumentRepository<any>,
    props: { email: string; role?: string },
  ): Promise<any | undefined> {
    const { email, role } = props;
    let user: Result<any>;
    if (Object.hasOwnProperty.call(props, 'email')) {
      user = await model.findOne({ email });
    }
    if (Object.hasOwnProperty.call(props, 'role')) {
      user = await model.findOne({ role });
    }
    return Boolean(user.isSuccess);
  }
}
