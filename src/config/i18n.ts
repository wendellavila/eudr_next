import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/PT-br';

export const i18nConfig = {
    locales: ['en', 'pt'],
    defaultLocale: 'en'
}

export function getMaterialReactTableLocalization(lang: string) {
    if(lang === 'pt'){
        return MRT_Localization_PT_BR;
    }
    return MRT_Localization_EN;
}

export function getDayjsLocalization(lang: string) {
    if(lang === 'pt'){
        return require('dayjs/locale/pt');
    }
    return require('dayjs/locale/en');
}