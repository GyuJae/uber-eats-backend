import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import {
  DishEntity,
  DishOptionChoiceEntity,
  DishOptionEntity,
} from 'src/restaurants/entities/dish.entity';
import {
  OrderEntity,
  OrderItemEntity,
  SelectOptionChoicesEntity,
} from '../entities/order.entity';

@InputType()
export class GetDetailOrderInput {
  @Field(() => Int)
  orderId: number;
}

@ObjectType()
export class SelectOptionChoicesEntityResult extends SelectOptionChoicesEntity {
  @Field(() => DishOptionEntity)
  option: DishOptionEntity;

  @Field(() => DishOptionChoiceEntity)
  choice: DishOptionChoiceEntity;
}

@ObjectType()
export class OrderItemResult extends OrderItemEntity {
  @Field(() => [SelectOptionChoicesEntityResult])
  selectOptionChoices: SelectOptionChoicesEntityResult[];
  @Field(() => DishEntity)
  dish: DishEntity;
}

@ObjectType()
export class OrderResult extends OrderEntity {
  @Field(() => [OrderItemResult])
  orderItems: OrderItemResult[];
}

@ObjectType()
export class GetDetailOrderOutput extends CoreOutput {
  @Field(() => OrderResult, { nullable: true })
  order?: OrderResult;
}
