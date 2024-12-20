import {
    Controller,
    Get,
    Body,
    Param,
    Query,
    ParseIntPipe,     // for converting string to integer
    DefaultValuePipe, // for default value
    ParseArrayPipe,   // for converting string to array
    ParseBoolPipe,    // for converting string to boolean
    ParseEnumPipe,
    Post,    // for converting string to enum
    ValidationPipe
} from '@nestjs/common';


// DTO
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    @Get('/:id')
    GetUser(
        @Param('id', ParseIntPipe) id: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number) {
        return `id: ${id}, page: ${page}, limit: ${limit}`;
    }

    @Post()
    CreateUser(@Body() body: CreateUserDto) {
        return body;
    }


}
