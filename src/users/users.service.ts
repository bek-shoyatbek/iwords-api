import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(order?: number, limit?: number) {
    const users = await this.prisma.user.findMany({
      orderBy: { coins: order ? 'asc' : 'desc' },
      take: limit,
    });

    users.map((user, index) => {
      user.rating = index + 1;
    });

    return users;
  }

  async getUser(id: string) {
    const users = await this.prisma.user.findMany({
      orderBy: { coins: 'desc' },
    });

    users.map((user, index) => {
      user.rating = index + 1;
    });

    return users.find((user) => user.id === id);
  }

  async updateUser(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }
}
