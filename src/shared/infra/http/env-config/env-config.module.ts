import { Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, `../../../.env`)],
    }),
  ],
  providers: [EnvConfigService],
})
export class EnvConfigModule {}
