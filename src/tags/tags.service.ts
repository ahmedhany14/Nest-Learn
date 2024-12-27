import { Injectable } from '@nestjs/common';

// entities
import { Tags } from './tags.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// dto
import { CreateTagsDto } from './dtos/create.tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  public async createTag(createTagsDto: CreateTagsDto) {
    return await this.tagsRepository.save(
      this.tagsRepository.create(createTagsDto),
    );
  }

  public async getTags(numbers: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(numbers),
      },
    });
  }
}
