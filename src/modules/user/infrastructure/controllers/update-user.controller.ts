import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@shared/infrastructure/http/guards/auth.guard';
import { UpdateUserDto } from '../dto/update-users.dto';
import { UpdateUserService } from '@modules/user/application/services/update-user.service';

@Controller('update-user')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Post()
  @UseGuards(AuthGuard)
  updateUser(@Body() userInfo: UpdateUserDto) {
    return this.updateUserService.execute(userInfo);
  }
}
