import { Module } from '@nestjs/common';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TierController],
  providers: [TierService],
})
export class TierModule {}