import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/constants/storage';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get('all')
  async getAll() {
    return await this.avatarsService.getAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async upload(@UploadedFile() avatar: Express.Multer.File) {
    if (!avatar) {
      throw new BadRequestException('No file uploaded');
    }
    // Save file to disk
    const filename = avatar?.filename;

    return await this.avatarsService.save(filename);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.avatarsService.delete(id);
  }
}
