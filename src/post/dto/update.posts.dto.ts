import { CreatePostsDto } from './create.posts.dto';
/*
import {
    PartialType
} from "@nestjs/mapped-types"
*/

/*
we can use PartialType from @nestjs/swagger to extend the CreatePostsDto and make all properties optional,
instead of using PartialType from @nestjs/mapped-types to make it appears in swagger documentation
*/
import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostsDto extends PartialType(CreatePostsDto) {
  @ApiProperty({
    required: true,
    description: 'The id of the post to update',
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
