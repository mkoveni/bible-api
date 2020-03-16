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
        book = book.toLowerCase();

        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book, chapter }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                })
                .catch(e => resolve(null));
        });
    }

    getTranslationVerses(translation: string, book: string, chapter: string) {
        translation = translation.toLowerCase();
        book = book.toLowerCase();

        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book: book, chapter: chapter, translation }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                })
                .catch(e => resolve(null));
        });
    }

    getVerseForTranslation(
        translation: string,
        book: string,
        chapter: string,
        number: string
    ) {
        return new Promise((resolve, reject) => {
            translation = translation.toLowerCase();
            book = book.toLowerCase();

            this.verseModel
                .findOne({
                    $and: [{ book, chapter, translation, number }]
                })
                .exec()
                .then(v => resolve(this.transformVerse(v)))
                .catch(e => resolve(null));
        });
    }

    getVerseForAll(book: string, chapter: string, number: string) {
        book = book.toLowerCase();

        return new Promise((resolve, reject) => {
            this.verseModel
                .find({
                    $and: [{ book, chapter, number }]
                })
                .exec()
                .then(res => {
                    resolve(res.map(v => this.transformVerse(v)));
                })
                .catch(e => resolve(null));
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
