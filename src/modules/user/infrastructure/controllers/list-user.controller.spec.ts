import { Test, TestingModule } from '@nestjs/testing';
import { ListUserController } from './list-user.controller';

describe('GetUserController', () => {
  let controller: ListUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUserController],
    }).compile();

    controller = module.get<ListUserController>(ListUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
