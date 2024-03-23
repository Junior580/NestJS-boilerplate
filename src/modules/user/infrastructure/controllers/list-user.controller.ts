import { ListUserService } from '@modules/user/application/services/list-user.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ListUsersDto } from '../dto/list-users.dto';
import { Roles } from '@shared/infrastructure/http/guards/roles.decorator';
import { AuthsGuard } from '@shared/infrastructure/http/guards/auth.guard';

@Controller('list-user')
export class ListUserController {
  constructor(private readonly userService: ListUserService) {}

  @Get()
  @Roles('ADMIN', 'USER')
  @UseGuards(AuthsGuard)
  listUsers(@Query() searchParams: ListUsersDto) {
    return this.userService.execute(searchParams);
  }
}
