import { IsEnum, IsInt } from 'class-validator';
import { Medal } from 'libs/domain/medal.enum';

export class UpdateMedalRequestDto {
  @IsInt()
  userId: number;

  @IsInt()
  totalPoints: number;

  @IsEnum(Medal)
  medal: Medal;
}
