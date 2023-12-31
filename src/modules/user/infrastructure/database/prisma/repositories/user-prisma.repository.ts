import { UserEntity } from '@modules/user/domain/entities/user.entity';
import {
  UserRepository,
  UserSearchParams,
  UserSearchResult,
} from '@modules/user/domain/repositories/user.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { UserModelMapper } from '../models/user-model.mapper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/twoFactorToken.entity';
import { VerificationTokenModelMapper } from '../models/verificationToken-model.mapper';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verificationToken.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(private prismaService: PrismaService) {}

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';

    const count = await this.prismaService.user.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.user.findMany({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });

    return new UserSearchResult({
      items: models.map((model) => UserModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

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
        accounts: true,
        emailVerified: true,
        image: true,
        password: true,
        isTwoFactorEnabled: true,
        role: true,
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

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });

      return UserModelMapper.toEntity(user);
    } catch (error) {
      throw new HttpException(
        `User Model not found using email ${email}`,
        HttpStatus.NOT_FOUND,
      );
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

  async getVerificationTokenByEmail(email: string) {
    try {
      const verificationToken =
        await this.prismaService.verificationToken.findFirst({
          where: { email },
        });

      return VerificationTokenModelMapper.toEntity(verificationToken);
    } catch (error) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }
  }

  async createVerificationToken(
    entity: VerificationTokenEntity,
  ): Promise<VerificationTokenEntity> {
    const verificationToken = await this.prismaService.verificationToken.create(
      {
        data: entity.toJSON(),
      },
    );

    return VerificationTokenModelMapper.toEntity(verificationToken);
  }

  async deteleToken(id: string): Promise<void> {
    await this.prismaService.verificationToken.delete({
      where: {
        id,
      },
    });
  }
}
