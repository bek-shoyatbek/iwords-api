import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AvatarsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.avatar.findMany();
  }
  async save(url: string) {
    return await this.prisma.avatar.create({ data: { url } });
  }

  async delete(id: string) {
    return await this.prisma.avatar.delete({ where: { id } });
  }
}
