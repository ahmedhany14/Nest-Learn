import { Inject, Injectable } from '@nestjs/common';

// DTOs
import { GetUserParmersDto } from './../user/dto/get-user-parmers.dto';
import { CreatePostsDto } from './dto/create.posts.dto';

// services
import { UserService } from '../user/user.service';
import { MetaOptionsService } from '../meta-options/meta-options.service';

// entities
import { Post } from './entitie/post.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly metaOptionsService: MetaOptionsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async getPosts(paramsDto: GetUserParmersDto) {
    const user = this.userService.findOnebyId(paramsDto.id);

    const posts = await this.postRepository.find({
      relations: ['metaOptions'], // will populate the metaOptions
    });
    return posts;
  }

  public async create(createPostsDto: CreatePostsDto) {
    return await this.postRepository.save(
      this.postRepository.create(createPostsDto),
    );
  }

  public async delete(id: number) {
    // get the post
    const post = await this.postRepository.findOne({ where: { id },
      relations: ['metaOptions'], // will populate the metaOptions
    });
    // delete the post
   await this.postRepository.delete({ id });
    // delete the metaOptions
    await this.metaOptionsService.delete(post.metaOptions.id);
    // response
    return {
      message: 'Post deleted successfully',
      postId: id,
      metaOptionsId: post.metaOptions.id,
    };
  }
}
