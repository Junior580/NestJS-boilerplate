import { JwtModuleOptions } from '@nestjs/jwt';

console.log(`auth.config.ts line 27 ~ ${process.env.JWT_PASS}`);

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_PASS || 'sua-chave-secreta-padrao',
  signOptions: { expiresIn: '24h' },
};
