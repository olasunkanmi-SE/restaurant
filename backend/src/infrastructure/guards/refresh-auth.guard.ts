import { AuthGuard } from '@nestjs/passport';

export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {}
