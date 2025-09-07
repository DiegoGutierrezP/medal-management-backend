import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import { UserMapper } from '../../application/mappers';
import { UserEntity } from '../../domain/entities';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(alias: string): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.create({ data: { alias } });
    return UserMapper.toDomain(prismaUser);
  }

  async update(id: number, data: Partial<User>): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findById(id: number): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        points: {},
      },
    });

    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findMany(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        points: {},
      },
    });

    return users.map((u) => UserMapper.toDomain(u));
  }
}
