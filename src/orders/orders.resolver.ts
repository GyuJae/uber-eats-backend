import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDER,
  PUB_SUB,
} from 'src/common/common.constants';
import { UpdateOrderInput } from './dtos/update-order.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take.order.dto';

@Resolver(() => OrderEntity)
export class OrdersResolver {
  constructor(
    private orderService: OrdersService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query(() => GetOrderOutput)
  @Roles('Any')
  async getOrder(
    @Args('input') getOrderInput: GetOrderInput,
    @CurrentUser() user: UserEntity,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(getOrderInput, user);
  }

  @Query(() => GetOrdersOutput)
  @Roles('Any')
  async getOrders(
    @Args('input') getOrdersInput: GetOrdersInput,
    @CurrentUser() user: UserEntity,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(getOrdersInput, user);
  }

  @Mutation(() => CreateOrderOutput)
  @Roles('Client')
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
    @CurrentUser() client: UserEntity,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(createOrderInput, client);
  }

  @Mutation(() => EditOrderOutput)
  @Roles('Any')
  async editOrder(
    @Args('input') editOrderInput: EditOrderInput,
    @CurrentUser() user: UserEntity,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(editOrderInput, user);
  }

  @Mutation(() => TakeOrderOutput)
  @Roles('Delivery')
  async takeOrder(
    @Args('input') takeOrderInput: TakeOrderInput,
    @CurrentUser() driver: UserEntity,
  ): Promise<TakeOrderOutput> {
    return this.orderService.takeOrder(takeOrderInput, driver);
  }

  @Subscription(() => OrderEntity, {
    filter: (
      {
        pendingOrders: {
          restaurant: { ownerId },
        },
      },
      _,
      { user },
    ) => {
      return ownerId === user.id;
    },
  })
  @Roles('Owner')
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
  }

  @Subscription(() => OrderEntity)
  @Roles('Delivery')
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
  }

  @Subscription(() => OrderEntity, {
    filter: (
      { updateOrder: order },
      { input }: { input: UpdateOrderInput },
      { user }: { user: UserEntity },
    ) => {
      if (
        order.clientId !== user.id &&
        order.driverId !== user.id &&
        order.restaurant.ownerId !== user.id
      ) {
        return false;
      }
      return order.id === input.orderId;
    },
  })
  @Roles('Any')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateOrder(@Args('input') _updateOrderInput: UpdateOrderInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
  }
}
