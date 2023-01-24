import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto, PrismaService, UpdateClientDto } from '@app/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) { }

  async create(createClientDto: CreateClientDto, options: Prisma.ClientSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    notes: true,
  }) {
    const client = await this.prisma.client.create({
      data: {
        ...createClientDto
      },
      select: options
    });

    if (!client) return null;

    return client;
  }

  async findOne(id: string, options: Prisma.ClientSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    notes: true,
  }) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: id
      },
      select: options
    });

    if (!client) return null;

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, options: Prisma.ClientSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    notes: true,
  }) {

    const client = await this.prisma.client.update({
      where: {
        id: id
      },
      data: {
        ...updateClientDto
      },
      select: options
    });

    if (!client) return null;

    return client;
  }
}
