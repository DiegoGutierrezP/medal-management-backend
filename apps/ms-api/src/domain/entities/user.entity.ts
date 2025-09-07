export class UserEntity {
  constructor(
    public readonly id: number,
    public alias: string,
    public totalPoints: number = 0,
    public medal: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  addPoints(value: number) {
    this.totalPoints += value;
  }
}
