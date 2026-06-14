import { Injectable } from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TierService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateTierDto) {
        return this.prisma.tier.create({ data });
    }
}
