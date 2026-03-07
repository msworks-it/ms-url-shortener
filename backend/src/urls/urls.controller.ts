import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UrlService } from './urls.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  allUrls() {
    return [];
  }

  @Get(':slug')
  findTarget(@Param('slug') slug: string) {
    return this.urlService.getTarget(slug);
  }

  @Post()
  create(@Session() user: UserSession, @Body() createUrlDto: CreateUrlDTO) {
    return this.urlService.createTarget(user.user.id, createUrlDto);
  }

  @Put(':slug')
  update(
    @Session() user: UserSession,
    @Param('slug') slug: string,
    @Body() updateUrlDto: CreateUrlDTO,
  ) {
    return this.urlService.updateTarget(slug, user.user.id, updateUrlDto);
  }

  // devo continuare a giocarci un pochino dai...
}
