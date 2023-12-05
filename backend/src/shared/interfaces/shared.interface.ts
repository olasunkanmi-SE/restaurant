import { Role } from 'src/application';

export interface IIsAuthorizedProps {
  currentRole: Role;
  requiredRole: Role;
}
