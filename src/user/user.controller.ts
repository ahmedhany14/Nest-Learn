import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe, // for converting string to integer
  DefaultValuePipe, // for default value
  ParseArrayPipe, // for converting string to array
  ParseBoolPipe, // for converting string to boolean
  ParseEnumPipe,
  Post, // for converting string to enum
  ValidationPipe,
} from '@nestjs/common';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParmersDto } from './dto/get-user-parmers.dto';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@Controller('user')
export class UserController {
  @Get('/:id')
  GetUser(@Param() params: GetUserParmersDto, @Query() query: GetUserQueryDto) {
    return `id: ${params.id}, page: ${query.page}, limit: ${query.limit}`;
  }

  @Post()
  CreateUser(@Body() body: CreateUserDto) {
    return body;
  }
}
