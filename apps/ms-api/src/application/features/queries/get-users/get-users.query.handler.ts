import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserRepository } from 'apps/ms-api/src/persistence/repositories/user.repository';
import { UserMapper } from '../../../mappers';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  private readonly logger = new Logger(GetUsersQueryHandler.name);

  constructor(private readonly usersRepository: UserRepository) {}

  async execute({}: GetUsersQuery): Promise<any> {
    const users = await this.usersRepository.findMany();

    return users.map((user) => UserMapper.toUserResponse(user));
  }
}
