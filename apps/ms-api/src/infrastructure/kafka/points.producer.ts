import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { PointsAddedEvent } from 'libs/events/points-added.event';

@Injectable()
export class PointsProducer implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'ms-api',
      brokers: [process.env.KAFKA_BROKER!],
    });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async publishPoints(message: PointsAddedEvent) {
    await this.producer.send({
      topic: 'points-added',
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
