import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

let md5 = require('md5');
var _ = require('lodash');

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
      let salt = md5(new Date());
      user.salt = salt;
      let hashedpwd = md5(createUserInput.password);
      let password = this.calculatePassword(hashedpwd, salt);
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

  async update(uuid: string, updateUserInput: UpdateUserInput) {
    var user = await this.findOne(uuid);
    let dict = {};
    for (let k in updateUserInput) {
      if (k == 'password') {
        let temp = this.calculatePassword(md5(updateUserInput[k]), user.salt);
        if (temp != user.password) {
          dict[k] = temp;
        }
      } else if (updateUserInput[k] != user[k]) {
        dict[k] = updateUserInput[k];
      }
    }
    if (!_.size(dict)) {
      // means no change
      return user;
    }
    if (user) {
      // update it
      let result = await this.connection
        .createQueryBuilder()
        .update(User)
        .set(dict)
        .where('uuid = :uuid', { uuid: uuid })
        .execute();
    }
    user = await this.findOne(uuid);
    return user;
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

  calculatePassword(password, salt) {
    let ret = '';
    for (let index in password) {
      ret += (
        parseInt(password[index], 16) ^ parseInt(salt[index], 16)
      ).toString(16);
    }
    return ret;
  }
}
