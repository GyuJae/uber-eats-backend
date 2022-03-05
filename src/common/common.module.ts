import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './common.constants';

const pubsub = new PubSub();

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [JwtModule, PUB_SUB],
})
export class CommonModule {}
