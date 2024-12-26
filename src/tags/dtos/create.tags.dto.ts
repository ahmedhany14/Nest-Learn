import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional, Matches, IsUrl
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTagsDto {

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(1024)
  schema: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  imageUrls: string;
}
