import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {
  @Field(() => Int)
  orderId: number;
}
