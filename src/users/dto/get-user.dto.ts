import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@ObjectType()
@Entity()
export class GetUserDTO {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => Timestamp)
  created_on: Timestamp;

  @Field(() => Timestamp)
  last_login: Timestamp;

}
