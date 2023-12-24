import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
