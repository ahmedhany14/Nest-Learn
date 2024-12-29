import {
    IsDate,
    IsOptional,
} from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination.query.dto';

class additionalFields {
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;
}

export class GetPostsQueryDto extends IntersectionType(PaginationQueryDto, additionalFields) {

}