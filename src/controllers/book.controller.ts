import { Translations, Books } from './../models/enums';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import VerseService from 'src/services/verse.service';
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
    constructor(private verseService: VerseService) {}

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
}
