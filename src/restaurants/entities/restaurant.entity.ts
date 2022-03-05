import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '@prisma/client';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class RestaurantEntity extends CoreEntity implements Restaurant {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  ownerId: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  coverImg: string;
}
