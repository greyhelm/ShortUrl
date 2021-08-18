import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShorturlModule } from './shorturl/shorturl.module';

@Module({
  imports: [ShorturlModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
