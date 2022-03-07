import { ObjectType, Field } from '@nestjs/graphql';
import {
  DishEntity,
  DishOptionChoiceEntity,
  DishOptionEntity,
} from 'src/restaurants/entities/dish.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  OrderEntity,
  OrderItemEntity,
  SelectOptionChoicesEntity,
} from '../entities/order.entity';

@ObjectType()
class SelectOptionChoicesEntityWithOptionAndChoice extends SelectOptionChoicesEntity {
  @Field(() => DishOptionEntity)
  option: DishOptionEntity;
  @Field(() => DishOptionChoiceEntity)
  choice: DishOptionChoiceEntity;
}

@ObjectType()
class OrderItemWithSelectOptionChoices extends OrderItemEntity {
  @Field(() => DishEntity)
  dish: DishEntity;

  @Field(() => [SelectOptionChoicesEntityWithOptionAndChoice])
  selectOptionChoices: SelectOptionChoicesEntityWithOptionAndChoice[];
}

@ObjectType()
class OrderWithUserAndRestaurant extends OrderEntity {
  @Field(() => RestaurantEntity)
  restaurant: RestaurantEntity;

  @Field(() => UserEntity)
  client: UserEntity;

  @Field(() => [OrderItemWithSelectOptionChoices])
  orderItems: [OrderItemWithSelectOptionChoices];
}

@ObjectType()
export class PendingOrderOutput extends OrderWithUserAndRestaurant {}
