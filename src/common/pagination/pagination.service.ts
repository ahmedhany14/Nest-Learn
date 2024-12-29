import { Inject, Injectable, Response } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core'
import { PaginationQueryDto } from './dtos/pagination.query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

import { PaginationResponseInterface } from './interface/pagination.responce..interface';

@Injectable()
export class PaginationService {

    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ) { }
    public getTakeAndSkip(query: PaginationQueryDto): { take: number, skip: number } {
        const { page, limit } = query;
        const take = limit;
        const skip = (page - 1) * limit;
        return { take, skip };
    }

    public async PaginateQuety<T>(
        query: PaginationQueryDto,
        repositoy: Repository<T>
    ) {
        const { take, skip } = this.getTakeAndSkip(query);

        const result = await repositoy.find({
            take,
            skip
        });


        const url = `${this.request.protocol}://${this.request.get('host')}`;
        const responce: PaginationResponseInterface<T> = {
            data: result,
            meta: {
                page: query.page,
                limit: query.limit,
                totalPages: Math.round(await repositoy.count() / query.limit),
                totalResults: await repositoy.count(),
                hasMore: (query.page * query.limit) < await repositoy.count()
            },
            links: {
                first: `${url}?page=1&limit=${query.limit}`,
                last: `${url}?page=${Math.round(await repositoy.count() / query.limit)}&limit=${query.limit}`,
                previous: query.page > 1 ? `${url}?page=${query.page - 1}&limit=${query.limit}` : null,
                next: (query.page * query.limit) < await repositoy.count() ? `${url}?page=${query.page + 1}&limit=${query.limit}` : null,
                current: `${url}?page=${query.page}&limit=${query.limit}`
            }
        }
        return responce;
    }
}
