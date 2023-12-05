import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY, Role } from '../../application';

export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);
