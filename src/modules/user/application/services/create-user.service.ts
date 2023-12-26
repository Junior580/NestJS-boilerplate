import { Injectable } from '@nestjs/common';
import { HashProvider } from '@shared/application/providers/hash-provider';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output.dto';
import { Service } from '@shared/application/services';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = UserOutput;

@Injectable()
export class UserService implements Service<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(input: Input) {
    const { email, name, password } = input;

    if (!email || !name || !password) {
      throw new Error('Input data not provided');
    }

    await this.userRepository.emailExists(email);

    const hashPassword = await this.hashProvider.generateHash(password);

    const entity = new UserEntity(
      Object.assign(input, { password: hashPassword }),
    );

    await this.userRepository.insert(entity);

    return UserOutputMapper.toOutput(entity);
  }
}
