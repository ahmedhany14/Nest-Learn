import { BadRequestException, Inject, Injectable } from '@nestjs/common';

// DTOs
import { GetUserParmersDto } from '../user/dto/get-user-parmers.dto';
import { CreatePostsDto } from './dto/create.posts.dto';

// services
import { UserService } from '../user/services/user.service';
import { MetaOptionsService } from '../meta-options/meta-options.service';
import { TagsService } from '../tags/tags.service';

// entities
import { Post } from './entitie/post.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostsDto } from './dto/update.posts.dto';

// Exceptions
import { RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly metaOptionsService: MetaOptionsService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

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

  public async update(patchPostDto: UpdatePostsDto) {
    let post = undefined;
    let tags = undefined;

    try {
      tags = await this.tagsService.getTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Request timeout',
        'The request to get tags has timed out',
      );
    }
    try {
      post = await this.postRepository.findOne({
        where: { id: patchPostDto.id },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Post not found',
        'The post with the given id was not found',
      );
    }

    if (!post || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('Invalid data', {
        description: 'The post or tags with the given id was not found',
      });
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.slug = patchPostDto.slug ?? post.slug;
    post.imageUrls = patchPostDto.imageUrls ?? post.imageUrls;
    post.schema = patchPostDto.schema ?? post.schema;
    post.status = patchPostDto.status ?? post.status;
    post.tags = tags;

    return await this.postRepository.save(post);
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
