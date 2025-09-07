import { Command } from '@nestjs/cqrs';
import { UpdateMedalRequestDto } from '../../../dtos';

export class UpdateMedalCommand extends Command<any> {
  constructor(public readonly request: UpdateMedalRequestDto) {
    super();
  }
}
