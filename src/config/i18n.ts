export const i18nConfig = {
    locales: ['en', 'pt'],
    defaultLocale: 'en'
}

export function getDayjsLocalization(lang: string) {
    if(lang === 'pt'){
        return require('dayjs/locale/pt');
    }
    return require('dayjs/locale/en');
}