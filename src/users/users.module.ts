import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  controllers:[UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
