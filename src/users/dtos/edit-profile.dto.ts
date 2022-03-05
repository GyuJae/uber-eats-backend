import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { CreateAccountInput } from './create-account.dto';

@InputType()
export class EditProfileInput extends PartialType(CreateAccountInput) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
