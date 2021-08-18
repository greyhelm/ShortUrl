import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrlController } from './shorturl.controller';
import { ShortUrlService } from './shorturl.service';
import { Url, UrlSchema } from '../schemas/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
