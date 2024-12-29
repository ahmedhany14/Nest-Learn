export interface PaginationResponseInterface<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
        hasMore: boolean;
    },
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
        current: string;
    }
}