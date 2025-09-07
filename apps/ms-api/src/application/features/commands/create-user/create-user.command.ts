import { Command } from '@nestjs/cqrs';
import { CreateUserRequestDto, UserResponseDto } from '../../../dtos';

export class CreateUserCommand extends Command<UserResponseDto> {
  constructor(public readonly request: CreateUserRequestDto) {
    super();
  }
}
