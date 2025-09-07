import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserPointMapper } from '../../application/mappers';
import { UserPointEntity } from '../../domain/entities';

@Injectable()
export class UserPointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, points: number): Promise<UserPointEntity> {
    const userPoint = await this.prisma.userPoint.create({
      data: { userId, points },
    });

    return UserPointMapper.toDomain(userPoint);
  }

  async findByUserId(userId: number): Promise<UserPointEntity[]> {
    const points = await this.prisma.userPoint.findMany({
      where: { userId },
    });

    return points.map((point) => UserPointMapper.toDomain(point));
  }
}
