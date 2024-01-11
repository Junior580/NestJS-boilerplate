import { NewVerificationService } from '@modules/user/application/services/new-verification.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth/new-verification')
export class NewVerificationController {
  constructor(
    private readonly newVerificationService: NewVerificationService,
  ) {}

  @Get()
  async newVerification(@Query('token') token: string) {
    return this.newVerificationService.execute(token);
  }
}
