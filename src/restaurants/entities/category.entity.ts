import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class CategoryEntity extends CoreEntity implements Category {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  coverImg: string | null;
}
