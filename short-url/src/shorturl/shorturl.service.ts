import { HttpException, Injectable } from '@nestjs/common';
import { URLS } from './url.mock';

@Injectable()
export class ShorturlService {
  urls = URLS;

  // return all mock data
  getUrls(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.urls);
    });
  }

  // fetch long url with short url from mock data
  getUrl(shortUrl): Promise<any> {
    const url = String(shortUrl);
    return new Promise((resolve) => {
      const longUrl = this.urls.find((longUrl) => longUrl.shortUrl === url);

      if (!longUrl) {
        throw new HttpException('Url does not exist', 404);
      }

      resolve(longUrl);
    });
  }

  // adds new url to mock data
  addUrl(newUrl): Promise<any> {
    const newUrlObj = {
      originalUrl: newUrl,
      shortUrl: '',
    };

    const newUrls = shortenUrl(newUrlObj);

    return new Promise((resolve) => {
      this.urls.push(newUrls);
      resolve(this.urls);
    });

    // shortening the URL
    function shortenUrl(urlObj) {
      //do shortening algorithm
      return {
        originalUrl: urlObj.originalUrl.url,
        shortUrl: 'shorter URL!',
      };
    }
  }

  removeUrl(urlToRemove): Promise<any>{
    const url = String(urlToRemove);
    return new Promise((resolve) => {
      const index = this.urls.findIndex((url) => url.originalUrl === urlToRemove);

      if (index === -1) {
        throw new HttpException('Url does not exist', 404);
      }
      this.urls.splice(index, 1);
      resolve(this.urls);
    });
  }
}
