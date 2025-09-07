// infrastructure/mappers/user.mapper.ts
import { UserPoint } from '@prisma/client';
import { UserPointEntity } from '../../domain/entities';

export class UserPointMapper {
  static toDomain(prismaUserPoint: UserPoint): UserPointEntity {
    return new UserPointEntity(
      prismaUserPoint.id,
      prismaUserPoint.userId,
      prismaUserPoint.points ?? 0,
      null,
      prismaUserPoint.createdAt,
    );
  }
}
