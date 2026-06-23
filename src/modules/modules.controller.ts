import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleQueryDto } from './dto/module-query.dto';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { RoleName } from '../../generated/prisma/client/enums';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Roles(RoleName.SUPER_ADMIN)
  @Post()
  create(
    @Body() createModuleDto: CreateModuleDto,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN, RoleName.ADMIN, RoleName.USER)
  findAll(
    @Query() query: ModuleQueryDto,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.findOne(id);
  }

  @Roles(RoleName.SUPER_ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Roles(RoleName.SUPER_ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.remove(id);
  }
}
