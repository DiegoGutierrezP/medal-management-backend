import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PointsAddedEvent } from 'libs/events/points-added.event';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @MessagePattern('points-added')
  async processPointsAdded(@Payload() message: PointsAddedEvent) {
    this.workerService.processPointsAdded(message);
  }
}
