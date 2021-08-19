import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlController } from './shorturl.controller';
import { ShortUrlService } from './shorturl.service';
import { Url, UrlDocument, UrlSchema } from '../schemas/url.schema';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

describe('ShortUrlController', () => {
  let controller: ShortUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest')],
      controllers: [ShortUrlController],
      providers: [ShortUrlService],
    }).compile();

    controller = module.get<ShortUrlController>(ShortUrlController);
  });

  describe('ShortUrlController', () => {
    let shortUrlController: ShortUrlController;
    let shortUrlService: ShortUrlService;
    let urlModel: Model<UrlDocument>;
    let resultObj: Promise<Url[]>;

    beforeEach(() => {
      shortUrlService = new ShortUrlService(urlModel);
      shortUrlController = new ShortUrlController(shortUrlService);
    });

    describe('getUrls', () => {
      it('should return an array of urls', async () => {
        const result = resultObj;
        jest.spyOn(shortUrlService, 'getUrls').mockImplementation(() => result);

        expect(await shortUrlController.getUrls()).toBe(result);
      });
    });
  });
});
