import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Dish, DishOptionChoice, DishOption } from '@prisma/client';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class DishEntity extends CoreEntity implements Dish {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  photo: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class DishOptionEntity extends CoreEntity implements DishOption {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class DishOptionChoiceEntity
  extends CoreEntity
  implements DishOptionChoice
{
  @Field(() => Int)
  dishOptionId: number;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  extra: number | null;
}
