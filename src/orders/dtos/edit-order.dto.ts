import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { OrderEntity } from '../entities/order.entity';

@InputType()
export class EditOrderInput extends PickType(
  OrderEntity,
  ['status'],
  InputType,
) {
  @Field(() => Int)
  orderId: number;
}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
