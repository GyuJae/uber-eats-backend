import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@InputType()
export class FindRestaurantsByCatgoryNameInput extends PaginationInput {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class FindRestaurantsByCatgoryNameOutput extends PaginationOutput {
  @Field(() => [RestaurantEntity], { nullable: true })
  result?: RestaurantEntity[];
}
