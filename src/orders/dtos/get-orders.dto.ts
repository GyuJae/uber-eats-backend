import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { OrderEntity } from '../entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field(() => [OrderEntity], { nullable: true })
  orders?: OrderEntity[];
}
