import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map, Observable, pipe, tap } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DataResponceInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService
  ) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // all code after return key work, executed before we go to the route
    console.log('Before...');

    return next.handle().pipe(
      map((dataFromRes) => {
        const res = context.switchToHttp().getResponse();
        return {
          apiVersion: this.configService.get<string>('app.apiVersion'),
          status: 'success',
          statusCode: res.statusCode,
          error: null,
          data: dataFromRes,
        };
      }),
    );
  }
}
