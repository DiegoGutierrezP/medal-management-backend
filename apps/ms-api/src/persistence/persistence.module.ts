import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { UserPointRepository } from './repositories/user-point.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UserPointRepository],
  exports: [UserRepository, UserPointRepository],
})
export class PersistenceLayerModule {}
