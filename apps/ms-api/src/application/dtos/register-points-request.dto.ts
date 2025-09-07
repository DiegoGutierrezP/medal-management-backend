import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class RegisterPointsRequestDto {
  @ApiProperty({
    description: 'points amount given',
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  points: number;

  @ApiProperty({
    description: 'User ID',
    type: Number,
  })
  @IsInt()
  @IsOptional()
  userId?: number;
}
