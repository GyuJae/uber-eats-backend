import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends PickType(
  RestaurantEntity,
  ['name', 'address', 'coverImg'],
  InputType,
) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
