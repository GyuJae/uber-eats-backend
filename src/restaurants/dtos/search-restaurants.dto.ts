import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@InputType()
export class SearchRestaurantsInput extends PaginationInput {
  @Field(() => String)
  keyword: string;
}

@ObjectType()
export class SearchRestaurantsOutput extends PaginationOutput {
  @Field(() => [RestaurantEntity], { nullable: true })
  result?: RestaurantEntity[];
}
