import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';

type Input = string;

type Output = {
  [key: string]: string;
};

@Injectable()
export class NewVerificationService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const existingToken =
      await this.userRepository.getVerificationTokenByToken(input);

    if (!existingToken) {
      return { error: 'Token does not exist!' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: 'Token has expired!' };
    }

    const existingUser = await this.userRepository.findByEmail(
      existingToken.email,
    );

    if (!existingUser) {
      return { error: 'Email does not exist!' };
    }

    await this.userRepository.updateUsererificationToken(
      existingUser.id,
      existingToken.email,
    );

    await this.userRepository.deteleToken(existingToken.id);

    return { success: 'Email verified!' };
  }
}
