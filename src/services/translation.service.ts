import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation } from 'src/models/translation';

@Injectable()
export default class TranslationService {
    constructor(
        @InjectModel('Translation')
        private readonly translationModel: Model<Translation>
    ) {}
    async findAll(): Promise<Translation[]> {
        return new Promise((resolve, reject) => {
            this.translationModel
                .find()
                .exec()
                .then(res => {
                    resolve(
                        res.map(t => {
                            const trans = {
                                id: t._id,
                                name: t.name
                            } as Translation;
                            return trans;
                        })
                    );
                })
                .catch(e => resolve(null));
        });
    }
}
