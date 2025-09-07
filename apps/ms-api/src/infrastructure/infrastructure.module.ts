import { Module } from '@nestjs/common';
import { PointsProducer } from './kafka/points.producer';

@Module({
  imports: [],
  providers: [PointsProducer],
  exports: [PointsProducer],
})
export class InfrastructureLayerModule {}
