import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { UserService } from '../services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { HttpExceptionFilter } from 'src/shared/infra/http/filters/http-exception.filter';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.execute(createUserDto);
  }
}
