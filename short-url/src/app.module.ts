import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShorturlModule } from './shorturl/shorturl.module';

@Module({
  imports: [ShorturlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
