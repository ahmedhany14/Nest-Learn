import { Inject, Injectable } from '@nestjs/common';

// DTOs
import { GetUserParmersDto } from '../user/dto/get-user-parmers.dto';
import { CreatePostsDto } from './dto/create.posts.dto';

// services
import { UserService } from '../user/user.service';
import { MetaOptionsService } from '../meta-options/meta-options.service';
import { TagsService } from '../tags/tags.service';

// entities
import { Post } from './entitie/post.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly metaOptionsService: MetaOptionsService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async getPosts(paramsDto: GetUserParmersDto) {
    const user = this.userService.findOnebyId(paramsDto.id);

    const posts = await this.postRepository.find({
      relations: ['metaOptions', 'author', 'tags'], // will populate the metaOptions and author
    });
    return posts;
  }

  public async create(createPostsDto: CreatePostsDto) {
    const user = await this.userService.findOnebyId(createPostsDto.authorId),
      tags = await this.tagsService.getTags(createPostsDto.tags);

    return await this.postRepository.save(
      this.postRepository.create({
        ...createPostsDto,
        author: user,
        tags: tags,
      }),
    );
  }

  public async delete(id: number) {
    // const post = await this.postRepository.findOne({ where: { id },
    //   relations: ['metaOptions'], // will populate the metaOptions
    // });
    // delete the post
    await this.postRepository.delete({ id });

    // Because of the onDelete: "CASCADE" in the MetaOptionsEntity, the metaOptions will also be deleted automatically
    //  await this.metaOptionsService.delete(post.metaOptions.id); // delete the metaOptions

    return {
      message: 'Post deleted successfully',
      postId: id,
    };
  }
}
