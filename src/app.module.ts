import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BibleModule from './bible.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://127.0.0.1/bible'), BibleModule],
    controllers: [],
    providers: []
})
export class AppModule {}
