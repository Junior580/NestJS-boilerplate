import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { UserService } from '../../application/services/create-user.service';
import { SignupDto } from '../dto/signup.dto';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() signupDto: SignupDto) {
    return this.userService.execute(signupDto);
  }
}
