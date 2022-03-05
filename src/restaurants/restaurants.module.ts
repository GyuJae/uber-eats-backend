import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  RestaurantsResolver,
  CategoryResolver,
  DishResolver,
} from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  providers: [
    RestaurantsResolver,
    RestaurantsService,
    PrismaService,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}
