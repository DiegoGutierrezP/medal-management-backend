import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceLayerModule } from '../persistence/persistence.module';
import { CreateUserCommandHandler } from './features/commands/create-user/create-user.command.handler';
import { GetUsersQueryHandler } from './features/queries/get-users/get-users.query.handler';
import { RegisterPointsCommandHandler } from './features/commands/register-points/register-points.command.handler';
import { GetUserProgressQueryHandler } from './features/queries/get-user-progress/get-user-progress.query.handler';
import { InfrastructureLayerModule } from '../infrastructure/infrastructure.module';
import { UpdateMedalCommandHandler } from './features/commands/update-medal/update-medal.command.handler';

@Module({
  imports: [
    CqrsModule.forRoot(),
    // Layers
    PersistenceLayerModule,
    InfrastructureLayerModule,
  ],
  providers: [
    // Commands
    CreateUserCommandHandler,
    RegisterPointsCommandHandler,
    UpdateMedalCommandHandler,
    // Queries
    GetUsersQueryHandler,
    GetUserProgressQueryHandler,
  ],
  exports: [],
})
export class ApplicationLayerModule {}
