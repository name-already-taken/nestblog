import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async create(createUserInput: CreateUserInput) {
    let user = new User();
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      user.userName = createUserInput.userName;
      // create salt and password
      let md5 = require("md5");
      let salt = md5(new Date());
      user.salt = salt;
      let hashedpwd = md5(createUserInput.password);
      let password = hashedpwd + salt;
      user.password = password;
      if (createUserInput.email) {
        user.email = createUserInput.email;
      }
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(uuid: string) {
    return await this.userRepository.findOne(uuid);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(uuid: string) {
    var user = await this.findOne(uuid);
    if (user) {
      // remove it
      let result = await this.connection
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('uuid = :uuid', { uuid: uuid })
        .execute();
    }
    return user;
  }
}
