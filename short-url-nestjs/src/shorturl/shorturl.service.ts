import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateURLDto } from './shorturl.dto';
import { Url, UrlDocument } from '../schemas/url.schema';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>,
  ) {}

  // return all data
  async getUrls(): Promise<Url[]> {
    return new Promise((resolve) => {
      resolve(this.urlModel.find().exec());
    });
  }

  // fetch long url with short url from database
  // if url already exists, then return data for it
  async getUrl(url): Promise<Url[]> {
    console.log('fetch shortUrl for: ' + url);
    let result = await new Promise((resolve) => {
      resolve(this.urlModel.find({ shortUrl: url }).exec());
    });

    if (result[0] == null) {
      result = await new Promise((resolve) => {
        resolve(this.urlModel.find({ originalUrl: url }).exec());
      });
    } else {
      console.log('object fetched: ' + result);
      // increment link usage
      result[0].linkUsage += 1;
      const resultModel = new this.urlModel(result[0]);
      await resultModel.save();
    }

    return result as Url[];
  }

  async addUrl(createUrlDto: CreateURLDto): Promise<Url> {
    const newUrl = new this.urlModel(createUrlDto);
    return newUrl.save();
  }

  async removeUrl(url): Promise<void> {
    const result = await this.urlModel.find({ shortUrl: url }).exec();
    await result[0].deleteOne();
  }
}
