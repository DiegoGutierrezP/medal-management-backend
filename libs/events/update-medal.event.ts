import { Medal } from 'libs/domain/medal.enum';

export class UpdateMedalEvent {
  constructor(
    public readonly userId: number,
    public readonly totalPoints: number,
    public readonly medal: Medal,
  ) {}
}
