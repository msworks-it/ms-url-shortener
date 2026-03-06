import { Controller, Get, Query, Param, Post, Body, Put } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';

@Controller('urls')
export class UrlsController {
  @Get()
  findAll(@Query('id') id: string) {
    return [{ id }];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() createUrlDto: CreateUrlDTO) {
    return createUrlDto;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: CreateUrlDTO) {
    return {
      id: id,
      data: updateUrlDto,
    };
  }

  // devo continuare a giocarci un pochino dai...
}
