import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import {
  DishEntity,
  DishOptionChoiceEntity,
  DishOptionEntity,
} from '../entities/dish.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';

@InputType()
export class FindRestaurantByIdInput {
  @Field(() => Int)
  restaurantId: number;
}

@ObjectType({ isAbstract: true })
class DishOptionWithChoice extends DishOptionEntity {
  @Field(() => [DishOptionChoiceEntity], { nullable: true })
  choices?: DishOptionChoiceEntity[];
}

@ObjectType()
class DishWithOption extends DishEntity {
  @Field(() => [DishOptionWithChoice], { nullable: true })
  options?: DishOptionWithChoice[];
}

@ObjectType()
class RestaurantWithDishes extends RestaurantEntity {
  @Field(() => [DishWithOption], { nullable: true })
  dishes?: DishWithOption[];
}

@ObjectType()
export class FindRestaurantByIdOutput extends CoreOutput {
  @Field(() => RestaurantWithDishes, { nullable: true })
  restaurant?: RestaurantWithDishes;
}
