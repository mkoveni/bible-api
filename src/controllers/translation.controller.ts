import { Translation } from 'src/models/translation';
import { Controller, Get } from '@nestjs/common';
import TranslationService from 'src/services/translation.service';
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger';

@Controller('/bibles')
export class TranslationController {
    constructor(private translationService: TranslationService) {}

    @Get()
    @ApiOkResponse({ type: Translation })
    @ApiProduces('application/json')
    getTranslations(): Promise<Translation[]> {
        return this.translationService.findAll();
    }
}
