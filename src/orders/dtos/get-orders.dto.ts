import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
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

@InputType()
export class GetOrdersInput {
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
class SelectOptionChoicesWithOptionAndChoice extends SelectOptionChoicesEntity {
  @Field(() => DishOptionEntity)
  option: DishOptionEntity;

  @Field(() => DishOptionChoiceEntity)
  choice: DishOptionChoiceEntity;
}

@ObjectType()
class OrderItemWithSelectOptionAndChoice extends OrderItemEntity {
  @Field(() => DishEntity)
  dish: DishEntity;

  @Field(() => [SelectOptionChoicesWithOptionAndChoice])
  selectOptionChoices: SelectOptionChoicesWithOptionAndChoice[];
}

@ObjectType()
export class OrdersWithRestaurantAndClient extends OrderEntity {
  @Field(() => RestaurantEntity)
  restaurant: RestaurantEntity;

  @Field(() => UserEntity)
  client: UserEntity;

  @Field(() => [OrderItemWithSelectOptionAndChoice])
  orderItems: OrderItemWithSelectOptionAndChoice[];
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field(() => [OrdersWithRestaurantAndClient], { nullable: true })
  orders?: OrdersWithRestaurantAndClient[];
}
