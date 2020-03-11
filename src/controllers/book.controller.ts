import { Controller, Get, Param } from '@nestjs/common';
import VerseService from 'src/services/verse.service';
import { ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { Verse } from 'src/models/verse';

@Controller()
export default class BookController {
    constructor(private verseService: VerseService) {}

    @Get(':book/:chapter')
    @ApiOkResponse({ type: Verse })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture'
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

        return verses;
    }

    @Get(':book/:chapter/:verse')
    @ApiOkResponse({ type: Verse })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture'
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'verse',
        description: 'Scripture number'
    })
    getVerse(
        @Param('book') book: string,
        @Param('chapter') chapter: string,
        @Param('verse') verse: string
    ) {
        return this.verseService.getVerseForAll(book, chapter, verse);
    }

    @Get('/v/:version/:book/:chapter')
    @ApiOkResponse({ type: Verse })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture'
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'version',
        description: 'Bible version/translation'
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

        return verses;
    }

    @Get('/v/:version/:book/:chapter/:verse')
    @ApiOkResponse({ type: Verse })
    @ApiParam({
        name: 'version',
        description: 'Bible version/translation'
    })
    @ApiParam({
        name: 'book',
        description: 'Book of the scripture'
    })
    @ApiParam({
        name: 'chapter',
        description: 'Chapter of the scripture'
    })
    @ApiParam({
        name: 'verse',
        description: 'Scripture number'
    })
    getTranslationVerse(
        @Param('version') version: string,
        @Param('book') book: string,
        @Param('chapter') chapter: string,
        @Param('verse') verse: string
    ) {
        return this.verseService.getVerseForTranslation(
            version,
            book,
            chapter,
            verse
        );
    }
}
