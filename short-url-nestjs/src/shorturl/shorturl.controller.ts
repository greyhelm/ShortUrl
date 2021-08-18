import {Controller, Get, Param, Post, Body, Delete, Query, Redirect, Res} from '@nestjs/common';
import { ShortUrlService } from './shorturl.service';
import { CreateURLDto } from './shorturl.dto';
import { Url } from '../schemas/url.schema';

@Controller('shorturl')
export class ShortUrlController {
  constructor(private shortUrlService: ShortUrlService) {}

  @Get()
  async getUrls() {
    console.log('get all data');
    return this.shortUrlService.getUrls();
  }

  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl, @Res() res) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    res.redirect(url.originalUrl);
  }

  @Post()
  async addUrl(@Body() createUrlDto: CreateURLDto, @Res() res) {
    console.log('adding url');
    const url = await this.shortUrlService.addUrl(createUrlDto);
    console.log('addUrl finished');
    res.redirect('/');
    return url;
  }

  @Delete()
  async removeUrl(@Query() query) {
    const url = await this.shortUrlService.removeUrl(query.url);
    return url;
  }
}

@Controller('redirect')
export class RedirectController {
  constructor(private shortUrlService: ShortUrlService) {}

  @Post()
  async redirect(@Body() createUrlDto: CreateURLDto) {
    const url = await this.shortUrlService.addUrl(createUrlDto);
    return url;
  }
}
