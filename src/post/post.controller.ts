import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Param, ParseIntPipe,
  Patch,
  Post, Query
} from "@nestjs/common";

// DI
import { PostService } from './post.service';
import { UserService } from '../user/services/user.service';

// DTOs
import { GetUserParmersDto } from './../user/dto/get-user-parmers.dto';
import { CreatePostsDto } from './dto/create.posts.dto';
import { UpdatePostsDto } from './dto/update.posts.dto';
import { GetPostsQueryDto } from './dto/get.posts.query.dto';

// Swagger
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ActiveUser } from "../auth/decorators/active-user.decorator";
import { ActiveUserInterface } from "../auth/interfaces/active-user.interface";

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    @Inject()
    private readonly postService: PostService,
  ) { }

  @Get('/:id')
  GetUserPosts(@Param() params: GetUserParmersDto, @Query() getPostsQueryDto: GetPostsQueryDto) {
    return this.postService.getPosts(params, getPostsQueryDto);
  }

  @ApiBody({ type: CreatePostsDto })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a new post' })
  @Post()
  CreatePost(@Body() createPostsDto: CreatePostsDto, @ActiveUser() user: ActiveUserInterface) {
    return this.postService.create(createPostsDto);
  }

  @ApiBody({ type: UpdatePostsDto })
  @ApiParam({ name: 'id', type: String, required: true, example: '1' })
  @Patch()
  UpdatePost(@Body() updatePostsDto: UpdatePostsDto) {
    return this.postService.update(updatePostsDto);
  }

  @ApiQuery({ name: 'id', type: String, required: true, example: '1' })
  @Delete()
  DeletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

}
