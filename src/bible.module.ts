import { VerseSchema } from './models/verse';
import { TranslationController } from './controllers/translation.controller';
import TranslationService from 'src/services/translation.service';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationSchema } from './models/translation';
import BookController from './controllers/book.controller';
import VerseService from './services/verse.service';

@Module({
    imports: [
        CacheModule.register(),
        MongooseModule.forFeature([
            {
                name: 'Translation',
                schema: TranslationSchema
            },
            {
                name: 'Verse',
                schema: VerseSchema
            }
        ])
    ],

    controllers: [TranslationController, BookController],
    providers: [TranslationService, VerseService]
})
export default class BibleModule {}
