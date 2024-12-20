import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe, // for converting string to integer
  DefaultValuePipe, // for default value
  ParseArrayPipe, // for converting string to array
  ParseBoolPipe, // for converting string to boolean
  ParseEnumPipe, // for converting string to enum
} from '@nestjs/common';

import { Inject } from '@nestjs/common';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParmersDto } from './dto/get-user-parmers.dto';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Service
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}

  @Get('/:id')
  GetUser(@Param() params: GetUserParmersDto, @Query() query: GetUserQueryDto) {
    const result = this.userService.findAll(params, query);
     return result;
  }

  @Post()
  CreateUser(@Body() body: CreateUserDto) {
    return body;
  }

  @Patch()
  UpdateUser(@Body() body: UpdateUserDto) {
    return body;
  }
}
