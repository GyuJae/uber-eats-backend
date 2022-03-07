import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';

@InputType()
class IOptionAndChoice {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  choiceId: number;
}

@InputType()
class CreateOrderInputList {
  @Field(() => Int)
  dishId: number;

  @Field(() => [IOptionAndChoice])
  optionAndChoice: IOptionAndChoice[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => [CreateOrderInputList])
  createOrderInputList: CreateOrderInputList[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
