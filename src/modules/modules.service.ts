import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleQueryDto } from './dto/module-query.dto';
import { Prisma } from '../../generated/prisma/client/client';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createModuleDto: CreateModuleDto) {
    console.log('createModuleDto', createModuleDto);
    // return this.prisma.module.create({
    //   data: {
    //     ...createModuleDto,
    //     createdBy: ,
    //   },
    // });
  }

  async findAll(query: ModuleQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      isActive,
    } = query;
    const where = {
      ...(isActive !== undefined && { isActive }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,

            },
          },
          {
            key: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,

            },
          },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.module.findMany({
        where,

        select: {
          id: true,
          name: true,
          key: true,
          description: true,
          parentId: true,
          isActive: true,
          createdDate: true,
        },

        skip: (page - 1) * limit,
        take: limit,

        orderBy: {
          createdDate: 'desc',
        },
      }),

      this.prisma.module.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.module.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        key: true,
        description: true,
        parentId: true,
        isActive: true,
      },
    });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    return this.prisma.module.update({
      where: {
        id,
      },
      data: updateModuleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.module.delete({
      where: {
        id,
      },
    });
  }
}