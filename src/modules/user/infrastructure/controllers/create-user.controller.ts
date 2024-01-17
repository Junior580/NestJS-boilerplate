import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('create-user')
@ApiTags('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({ status: 200, description: 'Operation has been successful' })
  create(@Body() signupDto: CreateUserDto) {
    return this.createUserService.execute(signupDto);
  }
}
