import { PartialType } from '@nestjs/mapped-types';

type ClientType = 'client' | 'lead' | 'other';

export class CreateClientDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image?: string;
  clientType: ClientType;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {
  id: string;
}