import { Query } from '@nestjs/cqrs';
import { UserProgressResponseDto } from '../../../dtos';

export class GetUserProgressQuery extends Query<UserProgressResponseDto> {
  constructor(public readonly userId: number) {
    super();
  }
}
