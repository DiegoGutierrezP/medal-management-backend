import { Command } from '@nestjs/cqrs';
import { RegisterPointsRequestDto } from '../../../dtos';

export class RegisterPointsCommand extends Command<any> {
  constructor(public readonly request: RegisterPointsRequestDto) {
    super();
  }
}
