// Guards
import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Patch, Post, Query, UseInterceptors, } from "@nestjs/common";

// DTO
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserParmersDto } from "./dto/get-user-parmers.dto";
import { GetUserQueryDto } from "./dto/get-user-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateManyUsersDto } from "./dto/create-many-users.dto";

// Service
import { UserService } from "./services/user.service";


// Swagger
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Auth } from "../auth/decorators/auth.decorator";
import { AuthTypeEnum } from "../auth/enums/AuthType.enum";

@Controller('user')
@ApiTags('user')
@Auth(AuthTypeEnum.BEARER)
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
  @Auth(AuthTypeEnum.NONE)
  @UseInterceptors(ClassSerializerInterceptor) // will exclude any property with @Exclude() decorator from the response
  public async CreateUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch()
  UpdateUser(@Body() body: UpdateUserDto) {
    return body;
  }

  @Post('/create-many')
  public async CreateManyUsers(@Body() users: CreateManyUsersDto) {
    const createdUsers = await this.userService.createManyUsers(users);
    return createdUsers;
  }
}
