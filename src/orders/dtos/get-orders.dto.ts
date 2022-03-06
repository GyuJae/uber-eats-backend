import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { OrderEntity } from '../entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class OrdersWithRestaurant extends OrderEntity {
  @Field(() => RestaurantEntity)
  restaurant: RestaurantEntity;
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field(() => [OrdersWithRestaurant], { nullable: true })
  orders?: OrdersWithRestaurant[];
}
