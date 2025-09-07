import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'User alias',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  alias: string;
}
