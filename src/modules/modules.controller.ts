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

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly modulesService: ModulesService,
  ) { }

  @Post()
  create(
    @Body() createModuleDto: CreateModuleDto,
  ) {
    return this.modulesService.create(
      createModuleDto,
    );
  }

  @Get()
  findAll(
    @Query() query: ModuleQueryDto,
  ) {
    return this.modulesService.findAll(
      query,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.modulesService.update(
      id,
      updateModuleDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.modulesService.remove(id);
  }
}