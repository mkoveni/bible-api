import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const TranslationSchema = new Schema({
    _id: { type: String },
    name: { type: String }
});

export class Translation extends Document {
    @ApiProperty({
        name: 'id',
        description: 'Identifier for the the bible version',
        example: 'nlt'
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'The name of the bible version',
        example: 'New Living Translation'
    })
    name: string;
}
