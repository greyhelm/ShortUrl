import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import shortenUtils from '../shorturl/shortUrl';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({
    required: true,
    default: shortenUtils.shorten
  })
  shortUrl: string;

  @Prop({
    required: true,
    default: 0
  })
  linkUsage: number;

  @Prop({
    required: true,
    default: Date.now()
  })
  timeStamp: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
