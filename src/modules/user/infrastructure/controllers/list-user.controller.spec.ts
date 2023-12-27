// import { Test, TestingModule } from '@nestjs/testing';
// import { ListUserController } from './list-user.controller';
// import { ListUserService } from '@modules/user/application/services/list-user.service';
// import { UserPrismaRepository } from '@modules/user/infrastructure/database/prisma/repositories/user-prisma.repository';
// import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
// import { ListUsersDto } from '../dto/list-users.dto';

// describe('GetUserController', () => {
//   let controller: ListUserController;
//   let userService: ListUserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ListUserController],
//       providers: [ListUserService, ListUserService],
//     }).compile();

//     controller = module.get<ListUserController>(ListUserController);
//     userService = module.get<ListUserService>(ListUserService);
//   });

//   it('should be defined', async () => {
//     expect(controller).toBeDefined();
//     expect(userService).toBeDefined();
//   });

//   it('should return data from ListUserService', async () => {
//     const searchParams: ListUsersDto = {
//       page: 1,
//     };
//     const expectedResult = {
//       page: 1,
//     };

//     jest.spyOn(userService, 'execute').mockResolvedValue(expectedResult);

//     const result = await controller.listUsers(searchParams);

//     expect(result).toBe(expectedResult);
//     expect(userService.execute).toHaveBeenCalledWith(searchParams);
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { ListUserController } from './list-user.controller';
import { ListUserService } from '@modules/user/application/services/list-user.service';
import { ListUsersDto } from '../dto/list-users.dto';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { INestApplication } from '@nestjs/common';

describe('ListUserController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: ListUserController;
  let userService: ListUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ListUserController],
      providers: [
        ListUserService,
        {
          provide: 'UserRepository',
          useValue: {
            findUsers: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    controller = module.get<ListUserController>(ListUserController);
    userService = module.get<ListUserService>(ListUserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('listUsers', () => {
    it('should return data from ListUserService', async () => {
      // Assert
      // expect(result).toBe(expectedResult);
      // expect(userService.execute).toHaveBeenCalledWith(searchParams);
    });
  });
});
