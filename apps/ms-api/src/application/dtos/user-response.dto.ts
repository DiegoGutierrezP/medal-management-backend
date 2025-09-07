import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User id',
  })
  id: number;
  @ApiProperty({
    description: 'User alias',
  })
  alias: string;
  @ApiProperty({
    description: 'User creation date',
  })
  createdAt?: Date;
}
