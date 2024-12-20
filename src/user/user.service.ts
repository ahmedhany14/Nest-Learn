import { Injectable } from '@nestjs/common';

// Dto
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { GetUserParmersDto } from './dto/get-user-parmers.dto';

@Injectable()
export class UserService {
  public findAll(getUserDto: GetUserParmersDto, queryDto: GetUserQueryDto) {
    return [
      {
        name: 'user 1',
        email: 'user1@gmail.com',
      },
      {
        name: 'user 2',
        email: 'user2@gmail.com',
      },
    ];
  }
}
