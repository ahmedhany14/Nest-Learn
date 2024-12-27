import { Body, Controller, Post } from '@nestjs/common';

// services
import { TagsService } from './tags.service';

//dto
import { CreateTagsDto } from './dtos/create.tags.dto';
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBody({ type: CreateTagsDto })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
  })
  @Post()
  createTag(@Body() createTagDto: CreateTagsDto) {
    return this.tagsService.createTag(createTagDto);
  }
}
