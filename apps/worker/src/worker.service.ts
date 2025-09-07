import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Medal } from 'libs/domain/medal.enum';
import { PointsAddedEvent } from 'libs/events/points-added.event';
import { UpdateMedalEvent } from 'libs/events/update-medal.event';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  private readonly MedalThresholds: Record<Medal, number> = {
    [Medal.BRONCE]: 0,
    [Medal.PLATA]: 500,
    [Medal.ORO]: 1000,
    [Medal.PLATINO]: 1500,
    [Medal.DIAMANTE]: 2500,
    [Medal.MAESTRO]: 4000,
    [Medal.GRAN_MAESTRO]: 6000,
  };

  constructor(@Inject('API_SERVICE') private client: ClientKafka) {}

  processPointsAdded(message: PointsAddedEvent) {
    try {
      this.logger.log(
        `Process points added started: userId=${message.userId} `,
      );

      const medal = this.calculateMedal(message.totalPoints);

      this.logger.log(`calculate Medal finish : medal=${medal} `);

      this.client.emit(
        'update-medal',
        JSON.stringify(
          new UpdateMedalEvent(message.userId, message.totalPoints, medal),
        ),
      );
    } catch (error) {
      this.logger.error('Process points added failed error:', error);
    }
  }

  calculateMedal(totalPoints: number): Medal {
    let currentMedal = Medal.BRONCE;

    for (const [medal, threshold] of Object.entries(this.MedalThresholds)) {
      if (totalPoints >= threshold) {
        currentMedal = medal as Medal;
      }
    }

    return currentMedal;
  }
}
