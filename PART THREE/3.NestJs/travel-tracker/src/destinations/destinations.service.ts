import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, createDestinationDto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: {
        name: createDestinationDto.name,
        travelDate: createDestinationDto.travelDate ? new Date(createDestinationDto.travelDate) : null,
        notes: createDestinationDto.notes || '',
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.destination.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.destination.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(id: number, userId: number, updateDestinationDto: UpdateDestinationDto) {
    const updateData: any = {};

    if (updateDestinationDto.name !== undefined) {
      updateData.name = updateDestinationDto.name;
    }
    if (updateDestinationDto.travelDate !== undefined) {
      updateData.travelDate = updateDestinationDto.travelDate ? new Date(updateDestinationDto.travelDate) : null;
    }
    if (updateDestinationDto.notes !== undefined) {
      updateData.notes = updateDestinationDto.notes;
    }

    return this.prisma.destination.updateMany({
      where: {
        id,
        userId,
      },
      data: updateData,
    });
  }

  async remove(id: number, userId: number) {
    return this.prisma.destination.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
