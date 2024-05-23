import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './public/avatars',
    }),
  ],
  controllers: [AvatarsController],
  providers: [AvatarsService, PrismaService],
})
export class AvatarsModule {}
