import { ObjectType, Field } from '@nestjs/graphql';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity, OrderItemEntity } from '../entities/order.entity';

@ObjectType()
class OrderWithUserAndRestaurant extends OrderEntity {
  @Field(() => RestaurantEntity)
  restaurant: RestaurantEntity;

  @Field(() => UserEntity)
  client: UserEntity;

  @Field(() => [OrderItemEntity])
  orderItems: [OrderItemEntity];
}

@ObjectType()
export class PendingOrderOutput extends OrderWithUserAndRestaurant {}
