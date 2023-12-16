import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { HashProviderService } from './hash-provider.service';
import { User, UserProps } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashProvider: HashProviderService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPass = await this.hashProvider.generateHash(
      createUserDto.password,
    );

    const userProps: UserProps = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPass,
      createdAt: new Date(),
    };

    const newUser = new User(userProps);

    return await this.prismaService.user.create({
      data: {
        ...newUser.props,
        password: hashedPass,
      },
    });
  }
}
