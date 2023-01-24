import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) { }

  @Post()
  async create(
    @Body('user') createUserDto: CreateUserDto
  ) {
    return await this.usersService.create(createUserDto, {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      verified: true,
    });
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll({
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      verified: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id, {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      verified: true,
    });

    if (user) return user;

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body('user')
    updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto, {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      verified: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}