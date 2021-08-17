import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { CreateURLDto } from './shorturl.dto';

@Controller('shorturl')
export class ShorturlController {
  constructor(private shortUrlService: ShorturlService) {}

  @Get()
  async getUrls() {
    const urls = await this.shortUrlService.getUrls();
    return urls;
  }

  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    return url;
  }

  @Post()
  async addUrl(@Body() createUrlDto: CreateURLDto) {
    const url = await this.shortUrlService.addUrl(createUrlDto);
    return url;
  }

  @Delete()
  async removeUrl(@Query() query) {
    const url = await this.shortUrlService.removeUrl(query.url);
    return url;
  }
}
