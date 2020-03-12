import { Verse } from './../models/verse';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export default class VerseService {
    constructor(
        @InjectModel('Verse') private readonly verseModel: Model<Verse>
    ) {}

    getVerses(book: string, chapter: string) {
        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book, chapter }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                });
        });
    }

    getTranslationVerses(translation: string, book: string, chapter: string) {
        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book: book, chapter: chapter, translation }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                });
        });
    }

    getVerseForTranslation(
        translation: string,
        book: string,
        chapter: string,
        number: string
    ) {
        return new Promise((resolve, reject) => {
            this.verseModel
                .findOne({
                    $and: [{ book, chapter, translation, number }]
                })
                .exec()
                .then(v => resolve(this.transformVerse(v)));
        });
    }

    getVerseForAll(book: string, chapter: string, number: string) {
        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book, chapter, number }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                });
        });
    }

    private transformVerse(verse: any): Verse {
        const newVerse = {
            version: verse.translation,
            number: verse.number,
            book: verse.book,
            chapter: verse.chapter,
            text: verse.text
        } as Verse;

        return newVerse;
    }
}
