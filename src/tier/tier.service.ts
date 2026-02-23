import { Injectable } from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier';
import prisma from '../../lib/prisma';

@Injectable()
export class TierService {
    async create(data: CreateTierDto) {
        return prisma.tier.create({data})
    }

}
