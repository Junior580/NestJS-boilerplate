import { ListUserService } from '@modules/user/application/services/list-user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@shared/infrastructure/http/guards/auth.guard';

@Controller('list-user')
export class ListUserController {
  constructor(private readonly userService: ListUserService) {}

  @Get()
  @UseGuards(AuthGuard)
  listUsers() {
    return this.userService.execute();
  }
}
