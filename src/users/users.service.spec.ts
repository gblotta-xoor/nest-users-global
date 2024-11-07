import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<ReturnType<typeof mockUserRepository>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        profile: { code: 1234, name: 'Test Profile' }
      };
      (repository.save).mockResolvedValue(createUserDto);

      expect(await service.create(createUserDto)).toEqual(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
    });

    it('should validate required fields in CreateUserDto', async () => {
      const createUserDto = new CreateUserDto();
      const errors = await validate(createUserDto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ name: 'Test User' }];
      repository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const id = 'someId';
      const user = { name: 'Test User' };
      repository.findOneBy.mockResolvedValue(user);

      expect(await service.findOne(id)).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if user not found', async () => {
      const id = 'someId';
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = new ObjectId();
      const updateUserDto = { name: 'Updated User' };
      const updateResult = { value: { name: 'Updated User' } };
      repository.findOneAndUpdate.mockResolvedValue(updateResult);

      expect(await service.update(id.toHexString(), updateUserDto)).toEqual({ message: 'User updated successfully' });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ _id: new ObjectId(id) }, { $set: updateUserDto });
    });

    it('should throw a NotFoundException if user not found', async () => {
      const id = new ObjectId();
      const updateUserDto = { name: 'Updated User' };
      repository.findOneAndUpdate.mockResolvedValue({ value: null });

      await expect(service.update(id.toHexString(), updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = new ObjectId();
      const deleteResult = { value: { name: 'Deleted User' } };
      repository.findOneAndDelete.mockResolvedValue(deleteResult);

      expect(await service.remove(id.toHexString())).toEqual({ message: 'User deleted successfully' });
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ _id: new ObjectId(id) });
    });

    it('should throw a NotFoundException if user not found', async () => {
      const id = new ObjectId();
      repository.findOneAndDelete.mockResolvedValue({ value: null });

      await expect(service.remove(id.toHexString())).rejects.toThrow(NotFoundException);
    });
  });
});