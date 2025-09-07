import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'apps/ms-api/src/persistence/repositories/user.repository';
import { UserPointRepository } from '../../../../persistence/repositories/user-point.repository';
import { UpdateMedalCommand } from './update-medal.command';

@CommandHandler(UpdateMedalCommand)
export class UpdateMedalCommandHandler
  implements ICommandHandler<UpdateMedalCommand>
{
  private readonly logger = new Logger(UpdateMedalCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async execute({ request }: UpdateMedalCommand) {
    this.logger.log(`Update medal process started`);

    const user = await this.userRepository.findById(request.userId);

    if (!user) {
      this.logger.warn(`User ${request.userId} not found`);
      throw new NotFoundException(`User ${request.userId} not found`);
    }

    const userUpdated = await this.userRepository.update(request.userId, {
      totalPoints: request.totalPoints,
      medal: request.medal,
    });

    this.logger.log(`User updated - medal`);

    return userUpdated;
  }
}
