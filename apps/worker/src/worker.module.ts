import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'API_SERVICE',
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
    ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
