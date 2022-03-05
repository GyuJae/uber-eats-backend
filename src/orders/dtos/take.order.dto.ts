import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';

@InputType()
export class TakeOrderInput {
  @Field(() => Int)
  orderId: number;
}

@ObjectType()
export class TakeOrderOutput extends CoreOutput {}
