import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TranslationService from './services/translation.service';
import BibleModule from './bible.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://192.168.10.10/bible'),
        BibleModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
