import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';
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
    try {
      const user = await this.userRepository.create(request.alias);

      return UserMapper.toUserResponse(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Alias ya existe');
      }
      throw new BadRequestException(
        error.message || 'Ocurrio un error al registrar el usuario',
      );
    }
  }
}
