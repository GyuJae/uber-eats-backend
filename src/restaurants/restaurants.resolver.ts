import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import {
  AllRestaurantInput,
  AllRestaurantOutput,
} from './dtos/all-restaurant.dto';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import {
  FindRestaurantByIdInput,
  FindRestaurantByIdOutput,
} from './dtos/find-restaurant-by-id.dto';
import {
  FindRestaurantsByCatgoryNameInput,
  FindRestaurantsByCatgoryNameOutput,
} from './dtos/find-restaurants-by-category.dto';
import {
  SearchRestaurantsInput,
  SearchRestaurantsOutput,
} from './dtos/search-restaurants.dto';
import { CategoryEntity } from './entities/category.entity';
import { DishEntity } from './entities/dish.entity';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => RestaurantEntity)
export class RestaurantsResolver {
  constructor(private restaurantService: RestaurantsService) {}

  @Query(() => AllRestaurantOutput)
  @Roles('Any')
  async allRestaurant(
    @Args('input') allRestaurantInput: AllRestaurantInput,
  ): Promise<AllRestaurantOutput> {
    return this.restaurantService.allRestaurant(allRestaurantInput);
  }

  @Query(() => FindRestaurantByIdOutput)
  @Roles('Any')
  async findRestaurantById(
    @Args('input') allRestaurantInput: FindRestaurantByIdInput,
  ): Promise<FindRestaurantByIdOutput> {
    return this.restaurantService.findRestaurantById(allRestaurantInput);
  }

  @Query(() => FindRestaurantsByCatgoryNameOutput)
  @Roles('Any')
  async findRestaurantsByCatgoryName(
    @Args('input')
    findRestaurantsByCatgoryNameInput: FindRestaurantsByCatgoryNameInput,
  ): Promise<FindRestaurantsByCatgoryNameOutput> {
    return this.restaurantService.findRestaurantsByCatgoryName(
      findRestaurantsByCatgoryNameInput,
    );
  }

  @Query(() => SearchRestaurantsOutput)
  @Roles('Any')
  async searchRestaurants(
    @Args('input')
    searchRestaurantsInput: SearchRestaurantsInput,
  ): Promise<SearchRestaurantsOutput> {
    return this.restaurantService.searchRestaurants(searchRestaurantsInput);
  }

  @Mutation(() => CreateRestaurantOutput)
  @Roles('Owner')
  createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      createRestaurantInput,
      owner,
    );
  }

  @Mutation(() => EditRestaurantOutput)
  @Roles('Owner')
  editRestaurant(
    @Args('input') editRestaurantInput: EditRestaurantInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(editRestaurantInput, owner);
  }

  @Mutation(() => DeleteRestaurantOutput)
  @Roles('Owner')
  deleteRestaurant(
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(
      deleteRestaurantInput,
      owner,
    );
  }
}

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private restaurantService: RestaurantsService) {}

  @ResolveField(() => Int)
  async countRestaurants(@Parent() category: CategoryEntity): Promise<number> {
    return this.restaurantService.coundRestaurants(category);
  }

  @Query(() => AllCategoriesOutput)
  async allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories();
  }
}

@Resolver(() => DishEntity)
export class DishResolver {
  constructor(private restaurantService: RestaurantsService) {}

  @Mutation(() => CreateDishOutput)
  @Roles('Owner')
  async createDish(
    @Args('input') createDishInput: CreateDishInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<CreateDishOutput> {
    return this.restaurantService.createDish(createDishInput, owner);
  }

  @Mutation(() => DeleteDishOutput)
  @Roles('Owner')
  async deleteDish(
    @Args('input') deleteDishInput: DeleteDishInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDish(deleteDishInput, owner);
  }

  @Mutation(() => EditDishOutput)
  @Roles('Owner')
  async editDish(
    @Args('input') editDishInput: EditDishInput,
    @CurrentUser() owner: UserEntity,
  ): Promise<EditDishOutput> {
    return this.restaurantService.editDish(editDishInput, owner);
  }
}
