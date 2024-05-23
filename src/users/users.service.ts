import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(order: number) {
    return this.prisma.user.findMany({
      orderBy: { coins: order ? 'asc' : 'desc' },
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const coins = (updateUserDto?.coins as number) || 0;
    if (coins && coins < 0) {
      throw new BadRequestException('Coins cannot be less than 0');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        coins: { increment: coins },
      },
    });
  }
}
