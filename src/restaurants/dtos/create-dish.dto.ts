import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { DishOptionChoiceEntity, DishEntity } from '../entities/dish.entity';

@InputType()
export class DishOptionChoiceInput extends PickType(
  DishOptionChoiceEntity,
  ['extra', 'name'],
  InputType,
) {}

@InputType()
class DishOptionAndChoice {
  @Field(() => String)
  optionName: string;

  @Field(() => [DishOptionChoiceInput], { nullable: true })
  choices?: DishOptionChoiceInput[];
}

@InputType()
export class CreateDishInput extends PickType(
  DishEntity,
  ['name', 'price', 'photo', 'description', 'restaurantId'],
  InputType,
) {
  @Field(() => [DishOptionAndChoice], { nullable: true })
  options?: DishOptionAndChoice[];
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  dishId?: number;
}
