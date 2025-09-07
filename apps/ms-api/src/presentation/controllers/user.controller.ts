import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserRequestDto, UserResponseDto } from '../../application/dtos';
import { CreateUserCommand } from '../../application/features/commands/create-user/create-user.command';
import { GetUsersQuery } from '../../application/features/queries/get-users/get-users.query';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: [UserResponseDto],
  })
  get() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Post()
  @ApiBody({ type: CreateUserRequestDto })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data',
  })
  create(@Body() request: CreateUserRequestDto) {
    return this.commandBus.execute(new CreateUserCommand(request));
  }
}
