import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsArray,
  MinLength,
  IsEnum,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  Min,
  ValidateNested,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { MetaOptionsDto } from './../../meta-options/dtos/meta-options.dto';

export enum PostType {
  Post = 'post',
  Page = 'page',
  Story = 'story',
  Series = 'series',
}

export enum Status {
  Draft = 'draft',
  Scheduled = 'Scheduled',
  Published = 'published',
  Review = 'review',
}

export class CreatePostsDto {
  @ApiProperty({
    description: 'The title of the post',
    type: String,
    required: true,
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'The type of the post',
    enum: PostType,
    type: String,
    required: true,
    example: 'post',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'The status of the post',
    type: String,
    enum: Status,
    required: true,
    example: 'draft',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    description: 'The slug of the post',
    type: String,
    required: true,
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be all small letters and hyphen separated, like: my-first-post',
  }) // takes a regex pattern
  slug: string;

  @ApiProperty({
    description: 'The content of the post',
    type: String,
    required: true,
    example: 'This is my first post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The excerpt of the post',
    type: String,
    required: false,
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(1024)
  imageUrls: string;

  @ApiProperty({
    description: 'The schema of the post',
    type: String,
    required: false,
    example: '{"type":"object"}',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsJSON()
  schema: string;

  @ApiProperty({
    description: 'The published date of the post',
    type: Date,
    required: true,
    example: '2021-07-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  publishedAt: Date;

  @ApiProperty({
    description: 'The tags of the post',
    type: [String],
    required: true,
    example: ['tag1', 'tag2'],
  })

  /*
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) // each: true means each element of the array should be a string
  @MinLength(3, { each: true })
  tags: string[];
*/
  @ApiProperty({
    description: 'The metadata of the post',
    required: false,
    items: {
      type: 'object',
      properties: {
        value: {
          type: 'json',
          description: 'The metadata value should be a JSON object',
          example: "{'sideBar':'true'}",
        },
      },
    },
  })
  // Validate nested DTOs
  @Type(() => MetaOptionsDto) // this is used to tell the class-transformer to use the Metadata class to transform the nested object
  @IsOptional()
  metadata: MetaOptionsDto | null;
}
