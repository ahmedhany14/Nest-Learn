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
    ValidateNested
} from 'class-validator';


export enum PostType {
    Post = 'post',
    Page = 'page',
    Story = 'story',
    Series = 'series',
}

export enum Status {
    Draft = 'draft',
    Scaduled = 'scaduled',
    Published = 'published',
    Review = 'review',
}

class Metadata {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value: any;
}

export class CreatePostsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    title: string;

    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        {
            message: 'Slug must be all small letters and hyphen separated, like: my-first-post'
        }
    ) // takes a regex pattern
    slug: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    imageUrls: string;

    @IsNotEmpty()
    @IsOptional()
    @IsJSON()
    schema: string

    @IsISO8601()
    @IsNotEmpty()
    publishedAt: Date;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true }) // each: true means each element of the array should be a string
    @MinLength (3, { each: true })         
    tags: string[];

    @IsArray()
    @IsNotEmpty()

    // Validate nested DTOs
    @ValidateNested({ each: true }) // this Decorator is used to validate nested objects
    @Type(() => Metadata) // this is used to tell the class-transformer to use the Metadata class to transform the nested object
    metadata: Metadata[];

}