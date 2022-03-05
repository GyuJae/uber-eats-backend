import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';

@InputType()
export class IOptionAndChoice {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  choiceId: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int)
  dishId: number;

  @Field(() => [IOptionAndChoice])
  optionAndChoice: IOptionAndChoice[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
