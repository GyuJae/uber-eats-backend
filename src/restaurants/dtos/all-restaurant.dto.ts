import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@InputType()
export class AllRestaurantInput extends PaginationInput {}

@ObjectType()
export class AllRestaurantOutput extends PaginationOutput {
  @Field(() => [RestaurantEntity], { nullable: true })
  result?: RestaurantEntity[];
}
