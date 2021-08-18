import {Controller, Get, Param, Post, Body, Delete, Query, Redirect, Res} from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { CreateURLDto } from './shorturl.dto';
import {ShorturlModule} from "./shorturl.module";
import { Response } from '@nestjs/common';

@Controller('shorturl')
export class ShorturlController {
  constructor(private shortUrlService: ShorturlService) {}

  @Get()
  async getUrls() {
    console.log('all');
    const urls = await this.shortUrlService.getUrls();
    return urls;
  }

  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl, @Res() res) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    res.redirect(url.originalUrl);
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
