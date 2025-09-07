export class BaseResponseDto<T> {
  data: T;
  code?: number;
  message?: string;
}
