import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  user_id: number;

  @Field(() => String)
  @Column("varchar")
  username: string;

  @Field(() => String)
  @Column("varchar")
  password: string;

  @Field(() => String)
  @Column("varchar")
  email: string;

  @Field(() => Timestamp)
  @Column("timestamp")
  created_on: Timestamp;

  @Field(() => Timestamp)
  @Column("timestamp")
  last_login: Timestamp;

}
