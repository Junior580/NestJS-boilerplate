import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../application/services/create-user.service';
import { UserOutput } from '../../application/dto/user-output.ts';
import { UserEntity } from '../../domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: UserEntity = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secretpassword',
      };

      const user = new User(createUserDto);

      jest.spyOn(userService, 'execute').mockResolvedValueOnce({
        ...user.props,
        id: '123',
        createdAt: new Date(),
      });

      const result = await controller.create(createUserDto);

      expect(result).toEqual(createUserDto);

      expect(userService.execute).toHaveBeenCalledWith(createUserDto);
    });
  });
});
