import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @UseFilters(PrismaClientExceptionFilter)
  async getUsers(
    @Query('order', new ParseIntPipe({ optional: true })) order?: number,
  ) {
    console.log(order);
    return this.usersService.getUsers(order);
  }

  @Get('/:id')
  @UseFilters(PrismaClientExceptionFilter)
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch('/:id')
  @UseFilters(PrismaClientExceptionFilter)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    if (updateUserDto.email) {
      throw new BadRequestException('Email cannot be changed');
    }

    return this.usersService.updateUser(id, updateUserDto);
  }
}
