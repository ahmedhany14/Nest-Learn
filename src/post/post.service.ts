import { Inject, Injectable } from '@nestjs/common';

// DTOs
import { GetUserParmersDto } from './../user/dto/get-user-parmers.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
  ) {}

  public async getPosts(paramsDto: GetUserParmersDto) {
    const user = this.userService.findOnebyId(paramsDto.id);

    const posts = [
      {
        user,
        content: 'first post',
      },
      {
        user,
        content: 'second post',
      },
    ];
    return posts;
  }
}
