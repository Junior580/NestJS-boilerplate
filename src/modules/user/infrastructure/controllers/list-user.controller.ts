import { ListUserService } from '@modules/user/application/services/list-user.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@shared/infrastructure/http/guards/auth.guard';
import { ListUsersDto } from '../dto/list-users.dto';

@Controller('list-user')
export class ListUserController {
  constructor(private readonly userService: ListUserService) {}

  @Get()
  @UseGuards(AuthGuard)
  listUsers(@Query() searchParams: ListUsersDto) {
    return this.userService.execute(searchParams);
  }
}
