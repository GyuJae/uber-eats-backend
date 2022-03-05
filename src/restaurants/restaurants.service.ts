import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
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

@Injectable()
export class RestaurantsService {
  constructor(private prismaService: PrismaService) {}

  async createRestaurant(
    { categoryName, ...createRestaurantInput }: CreateRestaurantInput,
    owner: UserEntity,
  ): Promise<CreateRestaurantOutput> {
    try {
      await this.prismaService.restaurant.create({
        data: {
          ...createRestaurantInput,
          owner: {
            connect: {
              id: owner.id,
            },
          },
          category: {
            connectOrCreate: {
              where: {
                name: categoryName,
              },
              create: {
                name: categoryName,
              },
            },
          },
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editRestaurant(
    { restaurantId, categoryName, ...editRestaurantInput }: EditRestaurantInput,
    owner: UserEntity,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.prismaService.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
        select: {
          id: true,
          ownerId: true,
        },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }
      if (!editRestaurantInput || !categoryName) {
        return {
          ok: false,
          error: 'Please enter at least one',
        };
      }
      let newCategory: Category | null;
      if (categoryName) {
        const existCategory = await this.prismaService.category.findUnique({
          where: {
            name: categoryName,
          },
        });
        if (existCategory) {
          newCategory = existCategory;
        } else {
          newCategory = await this.prismaService.category.create({
            data: {
              name: categoryName,
            },
          });
        }
      }
      await this.prismaService.restaurant.update({
        where: {
          id: restaurant.id,
        },
        data: {
          ...editRestaurantInput,
          ...(newCategory && {
            category: {
              connect: {
                id: newCategory.id,
              },
            },
          }),
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteRestaurant(
    { restaurantId }: DeleteRestaurantInput,
    owner: UserEntity,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.prismaService.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
        select: {
          id: true,
          ownerId: true,
        },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }
      await this.prismaService.restaurant.delete({
        where: {
          id: restaurant.id,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.prismaService.category.findMany({});
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async coundRestaurants(category: CategoryEntity): Promise<number> {
    return this.prismaService.restaurant.count({
      where: {
        categoryId: category.id,
      },
    });
  }

  async allRestaurant({
    page,
  }: AllRestaurantInput): Promise<AllRestaurantOutput> {
    try {
      const restaurants = await this.prismaService.restaurant.findMany({
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalResults = await this.prismaService.restaurant.count({});
      return {
        ok: true,
        result: restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findRestaurantsByCatgoryName({
    page,
    categoryName,
  }: FindRestaurantsByCatgoryNameInput): Promise<FindRestaurantsByCatgoryNameOutput> {
    try {
      const restaurants = await this.prismaService.restaurant.findMany({
        where: {
          category: {
            name: categoryName,
          },
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalResults = await this.prismaService.restaurant.count({
        where: {
          category: {
            name: categoryName,
          },
        },
      });
      return {
        ok: true,
        result: restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findRestaurantById({
    restaurantId,
  }: FindRestaurantByIdInput): Promise<FindRestaurantByIdOutput> {
    try {
      const restaurant = await this.prismaService.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
        include: {
          dishes: {
            include: {
              options: {
                include: {
                  choices: true,
                },
              },
            },
          },
        },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchRestaurants({
    page,
    keyword,
  }: SearchRestaurantsInput): Promise<SearchRestaurantsOutput> {
    try {
      const restaurants = await this.prismaService.restaurant.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              address: {
                contains: keyword,
              },
            },
          ],
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalResults = await this.prismaService.restaurant.count({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              address: {
                contains: keyword,
              },
            },
          ],
        },
      });
      return {
        ok: true,
        result: restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createDish(
    { restaurantId, options, ...createDishInput }: CreateDishInput,
    owner: UserEntity,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.prismaService.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
        select: {
          id: true,
          ownerId: true,
        },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }

      const dish = await this.prismaService.dish.create({
        data: {
          restaurantId: restaurant.id,
          ...createDishInput,
        },
        select: {
          id: true,
        },
      });

      if (options) {
        options.forEach(async (option) => {
          const optionObj = await this.prismaService.dishOption.create({
            data: {
              name: option.content.name,
              dishId: dish.id,
            },
          });
          await this.prismaService.dishOptionChoice.createMany({
            data: option.choices.map((choice) => ({
              name: choice.name,
              extra: choice.extra,
              dishOptionId: optionObj.id,
            })),
          });
        });
      }

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteDish(
    { dishId }: DeleteDishInput,
    owner: UserEntity,
  ): Promise<DeleteDishOutput> {
    try {
      const dish = await this.prismaService.dish.findUnique({
        where: {
          id: dishId,
        },
        select: {
          id: true,
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (!dish) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }
      await this.prismaService.dish.delete({
        where: {
          id: dish.id,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editDish(
    { dishId, options, ...editDishInput }: EditDishInput,
    owner: UserEntity,
  ): Promise<EditDishOutput> {
    try {
      const dish = await this.prismaService.dish.findUnique({
        where: {
          id: dishId,
        },
        select: {
          id: true,
          options: true,
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (!dish) {
        return {
          ok: false,
          error: 'This id does not exist.',
        };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }
      await this.prismaService.dish.update({
        where: {
          id: dish.id,
        },
        data: {
          ...editDishInput,
        },
      });
      if (options) {
        await this.prismaService.dishOption.deleteMany({
          where: {
            dishId: dish.id,
          },
        });
        options.forEach(async (option) => {
          const optionObj = await this.prismaService.dishOption.create({
            data: {
              name: option.content.name,
              dishId: dish.id,
            },
          });
          await this.prismaService.dishOptionChoice.createMany({
            data: option.choices.map((choice) => ({
              name: choice.name,
              extra: choice.extra,
              dishOptionId: optionObj.id,
            })),
          });
        });
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
