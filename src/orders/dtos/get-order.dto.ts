import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { OrderEntity } from '../entities/order.entity';

@InputType()
export class GetOrderInput {
  @Field(() => Int)
  orderId: number;
}

@ObjectType()
export class GetOrderOutput extends CoreOutput {
  @Field(() => OrderEntity, { nullable: true })
  order?: OrderEntity;
}
