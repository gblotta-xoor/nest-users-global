import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe', email: 'test@m.com', age: 30,
        profile: {
          code: 1234,
          name: 'Test'
        }
      };
      const result = { id: 1, ...createUserDto };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(createUserDto as CreateUserDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'John Doe', email: 'test@m.com', age: 30, profile: { code: 1234, name: 'Test' } }];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { id: 1, name: 'John Doe', age: 30, email: 'test@m.com', profile: { code: 1234, name: 'Test' } };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(`${result.id}`)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'John Doe', age: 31 };
      const result = { id: new ObjectId(), ...updateUserDto, message: 'User updated successfully' };
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update(result.id.toHexString(), updateUserDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = { id: new ObjectId(), name: 'John Doe', age: 30, message: 'User deleted successfully' };
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(result.id.toHexString())).toBe(result);
    });
  });
});