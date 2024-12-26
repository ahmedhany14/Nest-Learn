import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// DI
import { PostService } from './post.service';
import { UserService } from '../user/user.service';

// DTOs
import { GetUserParmersDto } from './../user/dto/get-user-parmers.dto';
import { CreatePostsDto } from './dto/create.posts.dto';
import { UpdatePostsDto } from './dto/update.posts.dto';
// Swagger
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@Controller('post')
@ApiTags('post')
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

  @ApiBody({ type: CreatePostsDto })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a new post' })
  @Post()
  CreatePost(@Body() createPostsDto: CreatePostsDto) {
    return this.postService.create(createPostsDto);
  }

  @ApiBody({ type: UpdatePostsDto })
  @ApiParam({ name: 'id', type: String, required: true, example: '1' })
  @Patch('/:id')
  UpdatePost(@Body() body: UpdatePostsDto, @Param('id') id: string) {
    return body;
  }
}
