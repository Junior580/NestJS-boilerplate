import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: `${process.env.JWT_PASS}`,
  signOptions: { expiresIn: '24h' },
};
