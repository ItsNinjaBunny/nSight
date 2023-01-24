import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;

  image?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
}