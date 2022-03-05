import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/core-output.dto';

@InputType()
export class CreateAccountInput extends PickType(
  UserEntity,
  ['email', 'password', 'role'],
  InputType,
) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
