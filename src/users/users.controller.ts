import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';

@Controller('users')
export class UsersController {
    constructor(private userResolver: UsersResolver) { }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userResolver.findOne(id);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userResolver.findAll();
    }

}