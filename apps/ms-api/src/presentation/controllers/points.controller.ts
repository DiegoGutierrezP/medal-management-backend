import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterPointsRequestDto } from '../../application/dtos';
import { RegisterPointsCommand } from '../../application/features/commands/register-points/register-points.command';
import { GetUserProgressQuery } from '../../application/features/queries/get-user-progress/get-user-progress.query';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateMedalCommand } from '../../application/features/commands/update-medal/update-medal.command';
import { UpdateMedalEvent } from 'libs/events/update-medal.event';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('points')
@Controller('')
export class PointsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/users/:userId/points')
  registerPoints(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: RegisterPointsRequestDto,
  ) {
    body.userId = userId;
    return this.commandBus.execute(new RegisterPointsCommand(body));
  }

  @Get('/users/:userId/progress')
  userProgress(@Param('userId', ParseIntPipe) userId: number) {
    return this.queryBus.execute(new GetUserProgressQuery(userId));
  }

  @ApiExcludeEndpoint()
  @MessagePattern('update-medal')
  async handleUpdateMedal(@Payload() payload: UpdateMedalEvent) {
    console.log(
      'Evento recibido desde worker:',
      JSON.parse(JSON.stringify(payload)),
    );
    return this.commandBus.execute(new UpdateMedalCommand(payload));
  }
}
