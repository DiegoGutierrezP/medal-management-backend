import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './presentation/filters';
import { ResponseFormatInterceptor } from './presentation/interceptors';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'ms-api',
        brokers: [process.env.KAFKA_BROKER!],
      },
      consumer: {
        groupId: 'ms-api-group',
      },
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Medal management backend')
    .setDescription('API for managing medals')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
