import { Test, TestingModule } from '@nestjs/testing';
import { ListUserService } from './list-user.service';

describe('GetUserService', () => {
  let service: ListUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListUserService],
    }).compile();

    service = module.get<ListUserService>(ListUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
