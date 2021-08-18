import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateURLDto } from './shorturl.dto';
import { Url, UrlDocument } from '../schemas/url.schema';
import { URLS } from './url.mock';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>,
  ) {}

  urls = URLS;

  // return all data
  async getUrls(): Promise<Url[]> {
    return new Promise((resolve) => {
      resolve(this.urlModel.find().exec());
    });
  }

  async addUrl(createUrlDto: CreateURLDto): Promise<Url> {
    const newUrl = new this.urlModel(createUrlDto);
    return newUrl.save();
  }

  // fetch long url with short url from mock data
  getUrl(shortUrl): Promise<any> {
    const url = String(shortUrl);
    console.log(url);
    return new Promise((resolve) => {
      const longUrl = this.urls.find((longUrl) => longUrl.shortUrl === url);

      if (!longUrl) {
        throw new HttpException('Url does not exist', 404);
      }

      resolve(longUrl);
    });
  }

  // adds new url to mock data
  addNewUrl(newUrl): Promise<any> {
    console.log(newUrl);
    const isShortUrl = !newUrl.url ? true : false;
    console.log(isShortUrl);
    newUrl = isShortUrl ? newUrl.shorturl : newUrl.url;
    console.log(newUrl);

    const newUrlObj = {
      originalUrl: '',
      shortUrl: '',
    };

    if (isShortUrl) {
      newUrlObj.shortUrl = newUrl;
    } else {
      newUrlObj.originalUrl = newUrl;
    }

    const newUrls = shortenUrl(newUrlObj);
    console.log(newUrls.originalUrl);

    return new Promise((resolve) => {
      this.urls.push(newUrls);
      resolve(this.urls);
    });

    // shortening the URL
    function shortenUrl(urlObj) {
      //do shortening algorithm
      return {
        originalUrl: urlObj.originalUrl,
        shortUrl: 'shorter URL!',
      };
    }
  }

  removeUrl(urlToRemove): Promise<any> {
    const url = String(urlToRemove);
    return new Promise((resolve) => {
      const index = this.urls.findIndex(
        (url) => url.originalUrl === urlToRemove,
      );

      if (index === -1) {
        throw new HttpException('Url does not exist', 404);
      }
      this.urls.splice(index, 1);
      resolve(this.urls);
    });
  }
}
