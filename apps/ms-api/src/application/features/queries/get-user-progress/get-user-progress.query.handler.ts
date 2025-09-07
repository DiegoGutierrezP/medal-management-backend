import { Logger, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from 'apps/ms-api/src/persistence/repositories/user.repository';
import { GetUserProgressQuery } from './get-user-progress.query';
import { UserMapper } from '../../../mappers';

@QueryHandler(GetUserProgressQuery)
export class GetUserProgressQueryHandler
  implements IQueryHandler<GetUserProgressQuery>
{
  private readonly logger = new Logger(GetUserProgressQueryHandler.name);

  constructor(private readonly usersRepository: UserRepository) {}

  async execute({ userId }: GetUserProgressQuery): Promise<any> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return UserMapper.toUserProgressResponse(user);
  }
}
