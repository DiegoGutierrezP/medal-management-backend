import { ApiProperty } from '@nestjs/swagger';

export class UserProgressResponseDto {
  @ApiProperty({
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    description: 'User alias',
  })
  alias: string;

  @ApiProperty({
    description: 'total points',
  })
  totalPoints: number;

  @ApiProperty({
    description: 'Current medal',
  })
  medal: string;

  @ApiProperty({
    description: 'Last updated',
  })
  lastUpdated?: Date;
}
