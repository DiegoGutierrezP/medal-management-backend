import { Query } from '@nestjs/cqrs';
import { UserResponseDto } from '../../../dtos';

export class GetUsersQuery extends Query<UserResponseDto> {
  constructor() {
    super();
  }
}
