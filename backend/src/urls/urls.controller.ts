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

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  allUrls(@Query('userId', new ParseUUIDPipe()) userId: UUID) {
    try {
      return this.urlService.getAllUrls(userId); // insert pagination
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':slug')
  findTarget(@Param('slug') slug: string) {
    try {
      return this.urlService.getTarget(slug);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(
    @Session() user: UserSession,
    @Body(new ValidationPipe()) createUrlDto: CreateUrlDTO,
  ) {
    return this.urlService.createTarget(user.user.id, createUrlDto);
  }

  @Put(':slug')
  update(
    @Session() user: UserSession,
    @Param('slug') slug: string,
    @Body(new ValidationPipe()) updateUrlDto: CreateUrlDTO,
  ) {
    try {
      return this.urlService.updateTarget(slug, user.user.id, updateUrlDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      return this.urlService.deleteTarget(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
