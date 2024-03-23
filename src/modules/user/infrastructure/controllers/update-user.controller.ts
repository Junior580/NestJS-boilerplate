import { Body, Controller, Post } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-users.dto';
import { UpdateUserService } from '@modules/user/application/services/update-user.service';

@Controller('update-user')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Post()
  updateUser(@Body() userInfo: UpdateUserDto) {
    return this.updateUserService.execute(userInfo);
  }
}
