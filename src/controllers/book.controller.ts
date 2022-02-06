import { Translations, Books } from './../models/enums';
import { Controller, Get, Param, NotFoundException, Logger, Inject, CACHE_MANAGER } from '@nestjs/common';
import VerseService from 'src/services/verse.service';
import { Cache } from 'cache-manager'

import {
    ApiParam,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiResponse
} from '@nestjs/swagger';
import { Verse } from 'src/models/verse';
import Response from 'src/models/api';

@Controller()
export default class BookController {
    constructor(private verseService: VerseService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }


    @Get('/v/:version')
    @ApiOkResponse({ type: Verse })
    @ApiParam({
        name: 'version',
        description: 'Bible version/translation',
        enum: Translations
    })
    async getTranslationVerses(
        @Param('version') version: string
    ) {

        const verses = this.cacheManager.get(version) 

        if(Array.isArray(verses)) {
            return verses;
        }

        const v = await this.verseService.getVersesForTranslation(
            version.toLowerCase(),
        );
        
        this.cacheManager.set(version, v, {
            ttl: 60000
        }) 

        return v;
    }

    @Get('/v/:version/:book/:chapter')
    @ApiOkResponse({ type: Verse })
    @ApiNotFoundResponse({ type: Response, description: 'Resource not found.' })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture',
        enum: Books
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'version',
        description: 'Bible version/translation',
        enum: Translations
    })
    async getChapterForTranslation(
        @Param('version') version: string,
        @Param('book') book: string,
        @Param('chapter') chapter: string
    ) {
        console.log('yes')
        const verses = await this.verseService.getTranslationVerses(
            version,
            book,
            chapter
        );

        if (!verses) {
            throw new NotFoundException('Resource not found.');
        }

        return verses;
    }

    @Get('/v/:version/:book/:chapter/:verse')
    @ApiOkResponse({ type: Verse })
    @ApiNotFoundResponse({ type: Response, description: 'Resource not found.' })
    @ApiParam({
        name: 'version',
        description: 'Bible version/translation',
        enum: Translations
    })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture',
        enum: Books
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'verse',
        description: 'Scripture number'
    })
    async getTranslationVerse(
        @Param('version') version: string,
        @Param('book') book: string,
        @Param('chapter') chapter: string,
        @Param('verse') verse: string
    ) {
        console.log('yes')
        const v = await this.verseService.getVerseForTranslation(
            version,
            book,
            chapter,
            verse
        );

        if (!v) {
            throw new NotFoundException('Resource not found.');
        }

        return v;
    }

    @Get(':book/:chapter')
    @ApiOkResponse({ type: Verse })
    @ApiNotFoundResponse({ type: Response, description: 'Resource not found.' })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture',
        enum: Books
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    async getChapter(
        @Param('book') book: string,
        @Param('chapter') chapter: string
    ) {
        Logger.warn("Hi Mr "+ chapter)
        const verses = await this.verseService.getVerses(book, chapter);

        if (!verses) {
            throw new NotFoundException('Resource not found.');
        }

        return verses;
    }

    @Get(':book/:chapter/:verse')
    @ApiOkResponse({ type: Verse })
    @ApiNotFoundResponse({ type: Response, description: 'Resource not found.' })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture',
        enum: Books
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'verse',
        description: 'Scripture number'
    })
    async getVerse(
        @Param('book') book: string,
        @Param('chapter') chapter: string,
        @Param('verse') verse: string
    ) {
        Logger.warn("Hi Mr "+ book)
        const verses = await this.verseService.getVerseForAll(
            book,
            chapter,
            verse
        );

        if (!verses) {
            throw new NotFoundException('Resource not found.');
        }
        return verses;
    }
}
