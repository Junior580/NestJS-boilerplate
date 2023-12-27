import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../application/services/create-user.service';
import { SignupDto } from '../dto/signup.dto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() signupDto: SignupDto) {
    return this.userService.execute(signupDto);
  }
}
