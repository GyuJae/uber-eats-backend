import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Order,
  OrderItem,
  OrderStatus,
  SelectOptionChoices,
} from '@prisma/client';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class SelectOptionChoicesEntity
  extends CoreEntity
  implements SelectOptionChoices
{
  @Field(() => Int)
  dishId: number;

  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  choiceId: number;

  @Field(() => Int)
  orderId: number;
}

@ObjectType()
export class OrderItemEntity extends CoreEntity implements OrderItem {
  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class OrderEntity extends CoreEntity implements Order {
  @Field(() => Int, { nullable: true })
  driverId: number | null;

  @Field(() => Int)
  clientId: number;

  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int, { nullable: true })
  total: number | null;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.Pending })
  status: OrderStatus;
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'The supported user role.',
  valuesMap: {
    Pending: {
      description: '주문 받을지 안 받을지 보류 중',
    },
    Cooking: {
      description: '요리하는 중',
    },
    Cooked: {
      description: '요리 완성',
    },
    PickedUp: {
      description: '배달원이 가져감',
    },
    Delivered: {
      description: '배달 도착함',
    },
  },
});
