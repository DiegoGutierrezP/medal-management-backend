import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { ApplicationLayerModule } from '../application/application.module';
import { PointsController } from './controllers/points.controller';

@Module({
  imports: [ApplicationLayerModule],
  controllers: [HealthController, UserController, PointsController],
  providers: [],
  exports: [],
})
export class PresentationLayerModule {}
