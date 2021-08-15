import { Controller, Render, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Post()
  handleUrl(): string {
    return ''; //this.appService.handledUrl();
  }*/

  @Get()
  @Render('index')
  getHello() {
    const message = this.appService.getHello();
    return { message };
  }
}
