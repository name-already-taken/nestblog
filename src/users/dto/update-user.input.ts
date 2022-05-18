import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  uuid!: string;
  userName?: string;
  password?: string;
  email?: string;
}
