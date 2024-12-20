import { Controller, Get, Inject, Param } from '@nestjs/common';

// DI
import { PostService } from './post.service';
import { UserService } from '../user/user.service';

// DTOs
import { GetUserParmersDto } from './../user/dto/get-user-parmers.dto';

@Controller('post')
export class PostController {
  constructor(
    @Inject()
    private readonly postService: PostService,
  ) {}

  @Get('/:id')
  GetUserPosts(@Param() params: GetUserParmersDto) {
    console.log(params);
    return this.postService.getPosts(params);
  }
}
