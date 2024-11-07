import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BodyValidationPipe } from './validations/bodyValidation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, description: "Returns the user created" })
  @ApiResponse({ status: 400, description: "Validation error" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Fetch users' })
  @ApiResponse({ status: 200, description: 'Returns users from db' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Fetch user by id' })
  @ApiResponse({ status: 200, description: 'Returns user' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User has been updated.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body(new BodyValidationPipe()) updateUserDto: UpdateUserDto) {;
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User has been deleted.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
