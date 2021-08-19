import {Controller, Get, Param, Post, Body, Delete, Query, Redirect, Res, Render} from '@nestjs/common';
import { ShortUrlService } from './shorturl.service';
import { CreateURLDto } from './shorturl.dto';

@Controller('shorturl')
export class ShortUrlController {
  constructor(private shortUrlService: ShortUrlService) {}

  @Get()
  @Render('index')
  async getUrls() {
    //console.log('get all data');
    const shortUrls = await this.shortUrlService.getUrls();
    //console.log(shortUrls);
    return { shortUrls };
  }

  @Redirect('/shorturl')
  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl, @Res() res) {
    const url = await this.shortUrlService.getUrl(shortUrl);
    if (url == null) {
      console.log('Url not Found!');
      return res.sendStatus(404);
    }
    //console.log('found original url for '+ url[0].shortUrl +': ' + url[0].originalUrl);
    return { url: url[0].originalUrl }
  }

  @Post()
  async addUrl(@Body() createUrlDto: CreateURLDto, @Res() res) {
    let newUrl;
    // check if url is already existing
    const urlExists = await this.shortUrlService.getUrl(
      createUrlDto.originalUrl,
    );

    if (urlExists[0] == null) {
      newUrl = await this.shortUrlService.addUrl(createUrlDto);
      console.log('addUrl finished');
    } else {
      console.log('url already exists');
    }
    res.redirect('/shorturl');
    return newUrl;
  }

  @Delete()
  async removeUrl(@Query() query) {
    const url = await this.shortUrlService.removeUrl(query.url);
    return url;
  }
}