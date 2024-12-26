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


// Swagger
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject() private readonly userService: UserService) { }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'User found  successfully' })
  GetUser(@Param() params: GetUserParmersDto, @Query() query: GetUserQueryDto) {
    const result = this.userService.findAll(params, query);
    return result;
  }

  @Post()
  public async CreateUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch()
  UpdateUser(@Body() body: UpdateUserDto) {
    return body;
  }
}
