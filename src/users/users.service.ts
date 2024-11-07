import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersRepository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateUserDto });

    if (!updateResult.value) {
      throw new NotFoundException();
    }

    return {
      message: 'User updated successfully'
    }
  }

  async remove(id: string) {
    const operationResult = await this.usersRepository.findOneAndDelete({ _id: new ObjectId(id) });
    console.log(operationResult);

    if (!operationResult.value) {
      throw new NotFoundException();
    }

    return {
      message: 'User deleted successfully'
    }
  }
}
