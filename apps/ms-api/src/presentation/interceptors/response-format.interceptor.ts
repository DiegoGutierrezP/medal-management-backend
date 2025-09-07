import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BaseResponseDto } from '../../application/dtos';

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, BaseResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponseDto<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: any) => {
        return {
          data,
          code: response.statusCode || 200,
        } as BaseResponseDto<T>;
      }),
    );
  }
}
