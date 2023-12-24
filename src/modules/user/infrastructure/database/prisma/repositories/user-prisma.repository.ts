import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { UserModelMapper } from '../models/user-model.mapper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: entity.toJSON(),
    });
  }

  // async findById(id: string): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }

  async findAll(): Promise<UserEntity[]> {
    const models = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return models.map((model) => {
      return UserModelMapper.toEntity({
        ...model,
        password: 'cannot be displayed',
      });
    });
  }

  // async update(entity: UserEntity): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
  // async delete(id: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });

      return UserModelMapper.toEntity(user);
    } catch (error) {
      throw new Error(`UserModel not found using email ${email}`);
    }
  }

  async emailExists(email: string) {
    const userExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }
}
