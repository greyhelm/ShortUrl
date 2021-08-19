const { nanoid } = require('nanoid');
import { ShortUrlService } from './shorturl.service';

// found nano id to be fantastic to use
export default class shortenUtils {
  static shorten(val: string) {
    //const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    const urlID = nanoid(6); //.customAlphabet(alphabet, 6);
    console.log(urlID);
    return urlID;
  }
}
