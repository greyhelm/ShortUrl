import {Controller, Render, Get, Redirect} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/shorturl')
  getHello() {
    const message = this.appService.getHello();
    return message;
  }
}
