import { Controller, Get, Param, Post, Body, Delete, Query, Redirect, Res } from '@nestjs/common';
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

  @Redirect('/')
  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl, @Res() res) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    if (url == null) {
      console.log('Url not Found!');
      return res.sendStatus(404);
    }
    console.log('found original url for '+ url[0].shortUrl +': ' + url[0].originalUrl);
    return { url: url[0].originalUrl }
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

  @Get()
  async getUrl(@Body('shortUrl') shortUrl, @Res() res) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    console.log(url.length);
    console.log(JSON.parse(url[1].toString()));
    window.location.href = url[0].originalUrl; //res.redirect(url[0].originalUrl);
  }
}
