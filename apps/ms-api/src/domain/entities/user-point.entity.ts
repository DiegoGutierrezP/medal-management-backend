import { UserEntity } from './user.entity';

export class UserPointEntity {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly points: number,
    public readonly user?: UserEntity,
    public readonly createdAt?: Date,
  ) {}
}
