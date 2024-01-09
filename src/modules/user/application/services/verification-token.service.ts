import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Service } from '@shared/application/services';
import {
  VerificationTokenMapper,
  VerificationTokenOutput,
} from '../dto/verification-token-output.dto';
import { v4 as uuidv4 } from 'uuid';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verificationToken.entity';

type Input = string;

type Output = VerificationTokenOutput;

@Injectable()
export class VerificationTokenService implements Service<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: Input): Promise<Output> {
    Logger.log(`🚀 ~ Verification token service:${email}`);
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken =
      await this.userRepository.getVerificationTokenByEmail(email);

    if (existingToken) {
      await this.userRepository.deteleToken(existingToken.id);
    }

    const VerificationToken = {
      token,
      email,
      expires,
    };
    Logger.log(
      `🚀 ~ Verification token service:${JSON.stringify(VerificationToken)}`,
    );

    const entity = new VerificationTokenEntity(VerificationToken);

    const verificationToken =
      await this.userRepository.createVerificationToken(entity);

    return VerificationTokenMapper.toOutput(entity);
  }
}
