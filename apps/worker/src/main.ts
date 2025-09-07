import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'worker',
          brokers: [process.env.KAFKA_BROKER!],
        },
        consumer: {
          groupId: 'worker-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
