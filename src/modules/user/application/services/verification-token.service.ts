import { Injectable } from '@nestjs/common';
import { Service } from '@shared/application/services';
import {
  VerificationTokenMapper,
  VerificationTokenOutput,
} from '../dto/verification-token-output.dto';
import { v4 as uuidv4 } from 'uuid';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verification-token.entity';
import { VerificationTokenRepository } from '@modules/user/domain/repositories/verification-token.repository';

type Input = string;

type Output = VerificationTokenOutput;

@Injectable()
export class VerificationTokenService implements Service<Input, Output> {
  constructor(
    private readonly verificationTokenRepository: VerificationTokenRepository,
  ) {}
  async execute(email: Input): Promise<Output> {
    const existingToken =
      await this.verificationTokenRepository.getVerificationTokenByEmail(email);

    if (existingToken) {
      await this.verificationTokenRepository.deleteVerificationToken(
        existingToken.id,
      );
    }

    const token = uuidv4();

    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const VerificationToken = {
      token,
      email,
      expires,
    };

    const entity = new VerificationTokenEntity(VerificationToken);

    const verificationToken =
      await this.verificationTokenRepository.createVerificationToken(entity);

    return VerificationTokenMapper.toOutput(verificationToken);
  }
}
