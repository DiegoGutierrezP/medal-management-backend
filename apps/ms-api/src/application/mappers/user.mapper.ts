// infrastructure/mappers/user.mapper.ts
import { User } from '@prisma/client';
import { UserEntity } from '../../domain/entities';
import { UserResponseDto, UserProgressResponseDto } from '../dtos';

export class UserMapper {
  static toDomain(prismaUser: User): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.alias,
      prismaUser.totalPoints ?? 0,
      prismaUser.medal,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  static toUserProgressResponse(user: UserEntity): UserProgressResponseDto {
    return {
      id: user.id,
      alias: user.alias,
      medal: user.medal,
      totalPoints: user.totalPoints,
      lastUpdated: user.updatedAt,
    };
  }

  static toUserResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      alias: user.alias,
      createdAt: user.createdAt,
    };
  }
}
