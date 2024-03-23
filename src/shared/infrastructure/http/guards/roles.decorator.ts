import { SetMetadata } from '@nestjs/common';

type Role = 'USER' | 'ADMIN';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
