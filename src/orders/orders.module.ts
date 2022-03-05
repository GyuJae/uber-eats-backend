import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersResolver, OrdersService, PrismaService],
})
export class OrdersModule {}
