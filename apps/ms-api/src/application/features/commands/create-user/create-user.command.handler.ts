import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from 'apps/ms-api/src/persistence/repositories/user.repository';
import { UserMapper } from '../../../mappers';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute({ request }: CreateUserCommand) {
    const user = await this.userRepository.create(request.alias);

    return UserMapper.toUserResponse(user);
  }
}
