import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'apps/ms-api/src/persistence/repositories/user.repository';
import { RegisterPointsCommand } from './register-points.command';
import { UserPointRepository } from '../../../../persistence/repositories/user-point.repository';
import { PointsProducer } from '../../../../infrastructure/kafka/points.producer';

@CommandHandler(RegisterPointsCommand)
export class RegisterPointsCommandHandler
  implements ICommandHandler<RegisterPointsCommand>
{
  private readonly logger = new Logger(RegisterPointsCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userPointRepository: UserPointRepository,
    private readonly pointsProducer: PointsProducer,
  ) {}

  async execute({ request }: RegisterPointsCommand) {
    const user = await this.userRepository.findById(request.userId);

    if (!user) {
      throw new NotFoundException(`User ${request.userId} not found`);
    }

    const userPoint = await this.userPointRepository.create(
      request.userId,
      request.points,
    );

    this.logger.log(`User point entity created `);

    const totalPoints = user.totalPoints + userPoint.points;

    await this.pointsProducer.publishPoints({
      totalPoints: totalPoints,
      userId: user.id,
    });
  }
}
