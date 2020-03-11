import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const VerseSchema = new Schema({
    number: String,
    text: String,
    book: String,
    translation: String,
    chapter: String
});

export class Verse extends Document {
    @ApiProperty({
        name: 'number',
        description: 'Number for the scripture',
        example: 23
    })
    number: number;

    @ApiProperty({
        name: 'text',
        description: 'Scripture text',
        example: 'The LORD is my shepherd; I have all that I need.'
    })
    text: string;

    @ApiProperty({
        name: 'book',
        description: 'Book of the scripture',
        example: 'psalm'
    })
    book: string;

    @ApiProperty({
        name: 'chapter',
        description: 'Chapter of the scripture',
        example: 1
    })
    chapter: number;

    @ApiProperty({
        name: 'version',
        description: 'Number for the scripture',
        example: 'nlt'
    })
    version: string;
}
