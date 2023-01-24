import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto, EncryptionService, PrismaService, UpdateUserDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(EncryptionService)
    private readonly encryptionService: EncryptionService
  ) { }

  async create(createUserDto: CreateUserDto, options: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    verified: true,
  }) {
    const { password, ...user } = createUserDto;

    const result = await this.prisma.user.create({
      data: {
        password: await this.encryptionService.hash(password, 10),
        ...user,
      },
      select: options
    });

    if (result) return result;

    return null;
  }

  async findAll(options: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    verified: true,
  }) {
    const result = await this.prisma.user.findMany({
      select: options,
    });

    if (result) return result;

    return null;
  }

  async findOne(id: string, options: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    verified: true,
  }) {
    const result = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: options
    });

    if (result) return result;

    return null;
  }

  async update(id: string, updateUserDto: UpdateUserDto, options: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    verified: true,
  }) {
    const { password, ...user } = updateUserDto;
    const result = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...user,
      },
      select: options
    });

    if (result) return result;

    return null;
  }

  async remove(id: string) {
    const result = await this.prisma.user.delete({
      where: {
        id: id
      }
    });

    if (result) return result;

    return null;
  }
}
