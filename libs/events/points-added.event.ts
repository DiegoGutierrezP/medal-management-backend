export class PointsAddedEvent {
  constructor(
    public readonly userId: number,
    public readonly totalPoints: number,
  ) {}
}
