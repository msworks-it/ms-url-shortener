import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UrlService } from './urls.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import type { UUID } from 'crypto';
import { VerifyAccessDTO } from './dto/verify-access.dto';

@Controller({
  path: 'urls',
  version: ['1'],
})
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  async allUrls(@Query('userId', new ParseUUIDPipe()) userId: UUID) {
    try {
      return await this.urlService.getAllUrls(userId); // insert pagination
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':slug')
  async findTarget(@Param('slug') slug: string) {
    try {
      return await this.urlService.getAccess(slug);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(':slug')
  async verifyAccess(
    @Param('slug') slug: string,
    @Body() verifyAccessDto: VerifyAccessDTO,
  ) {
    try {
      return await this.urlService.getAccess(slug, verifyAccessDto.password);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(
    @Session() user: UserSession,
    @Body(new ValidationPipe()) createUrlDto: CreateUrlDTO,
  ) {
    return await this.urlService.createTarget(user.user.id, createUrlDto);
  }

  @Put(':slug')
  async update(
    @Session() user: UserSession,
    @Param('slug') slug: string,
    @Body(new ValidationPipe()) updateUrlDto: CreateUrlDTO,
  ) {
    try {
      return await this.urlService.updateTarget(
        slug,
        user.user.id,
        updateUrlDto,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      return await this.urlService.deleteTarget(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
