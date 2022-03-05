import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class UserEntity extends CoreEntity implements User {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The supported user role.',
  valuesMap: {
    Client: {
      description: 'The Client',
    },
    Owner: {
      description: 'The Owner',
    },
    Delivery: {
      description: 'The Delivery',
    },
  },
});
