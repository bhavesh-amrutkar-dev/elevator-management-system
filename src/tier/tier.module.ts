import { Module } from '@nestjs/common';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';

@Module({
  controllers: [TierController],
  providers: [TierService]
})
export class TierModule {}
