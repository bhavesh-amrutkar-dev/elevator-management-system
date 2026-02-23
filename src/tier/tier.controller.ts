import { Controller, Post, Body, Req } from '@nestjs/common';
import { TierService } from './tier.service';
import { CreateTierDto } from './dto/create-tier';
import { Roles } from '../auth/roles.decorator';
import { RoleName } from '../../generated/prisma/client/enums';

@Controller('tier')
export class TierController {
    constructor(private readonly tierService: TierService) { }
    @Roles(RoleName.SUPER_ADMIN)
    @Post()
    async create(@Body() data: CreateTierDto) {

        return this.tierService.create(data);
    }
}