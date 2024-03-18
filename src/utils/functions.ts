import { i18nConfig } from '@/config/i18n';
import { LatLng } from '@/typing/types';

/**
 * Formats date in the format yyyymmdd into dd/mm/yyyy
 * @param {string} date - A date in the format yyyymmdd.
*/
export function formatDate(date: string){
    return `${date.substring(6,8)}/${date.substring(4,6)}/${date.substring(0,4)}`;
}

/**
 * Scrolls the page smoothly to the element associated with the id provided.
 * @param {string} id - An html id.
*/
export function scrollToId(id: string) {
    id = id.substring(0,1) !== '#' ? `#${id}` : id;
    const section = document.querySelector(id);
    section?.scrollIntoView({behavior: 'smooth', block: 'start'});
};

/**
 * Generates internationalized metadata
 * @param {{lang: string}} params - Path parameters containing a supported lang.
 * If lang is undefined or not supported, the default language in i18nConfig is used.
*/
export async function generateMetadata({params: {lang}}: {params: {lang: string}}){
    const i18n = await getTranslations(lang ?? i18nConfig.defaultLocale);
    return {
        title: i18n.loginPage.title,
        description: i18n.loginPage.description,
        icons: {
            icon: `/img/favicon.png`,
        }
    };
 }

/**
 * Returns the preferred language among supported languages in config/i18nConfig
*/
export function getBrowserPreferredLanguage() : string {
    const languages =
    typeof window !== 'undefined'
      ? navigator.languages
      : [];

    for(const language of languages){
        const lang = language.substring(0,2); // extracting en from en-US
        if(i18nConfig.locales.includes(lang)){
            return lang;
        }
    }
    return i18nConfig.defaultLocale;
}

/**
 * Returns the current date as a yyyymmdd integer. This function does not account for timezones.
 * It is intended to be used in simple scenarios such as using the current date as a seed for a pseudorandom algorithm.
*/
export function dateToInt(){
    return Number((new Date()).toISOString().slice(0,10).replace(/-/g,''));
}

/**
 * Returns a random integer bigger than or equal to {min} and smaller than {max}.
 * @param {number} min - An integer used as the lower bound of possible randomly generated integers (Inclusive)
 * @param {number} max - An integer used as the upper bound of possible randomly generated integers (Exclusive)
 * @param {number} seed - An integer used as seed for the pseudorandom number generator.
*/
export function getRandomInt(min: number, max: number, seed?: number) : number {
    const randomWithSeed = (seed: number) : number => {
        // Forcing int
        seed = Math.round(seed);
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    let randomNumber = 0;
    if(seed !== undefined){
        randomNumber = randomWithSeed(seed);
    }
    else {
        randomNumber = Math.random();
    }
    return Math.floor(randomNumber * (max - min)) + min;
}

/**
 * Loads JSON files containing translations to be used for Internationalization.
 * @param {string} locale - The locale of the language to be loaded.
*/
export async function getTranslations(locale: string) {
    return (await import(`@/i18n/translations_${locale}.json`)).default
}

/**
 * Generates Next.js SSG Static Params using the locales defined in i18nConfig.
*/
export async function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({lang: locale}));
};

/**
 * Searches a pathname for valid locales defined in i18nConfig.
 * @param {string} pathname - Pathname to be searched.
*/
export function pathnameHasLocale(pathname: string): boolean {
    return i18nConfig.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
}

/**
 * Sorts a numeric array in ascending order, finds the middle of it,
 * and returns the value contained in that position.
 * @param {Array<number>} values - Array of numbers to be sorted and searched.
*/
function getMiddleOfSortedArray(values: Array<number>) : number {
    const middle = Math.floor(values.length / 2);
    values.sort((a, b) => a - b);
    return values[middle];
}

/**
 * Finds the median values in an array of arrays of longitude and latitude points.
 * Retuns an array with the median longitude in the first position and the median longitude in the second.
 * This is used as a cheap way of finding a point inside a polygon.
 * @param {Array<[number,number]>} coordinates - An array of arrays with longitude in
 * the first position and latitude in the second position
*/
export function getMedianPoint(coordinates: Array<[number,number]>) : [number,number] {
    const longitudes = coordinates.map(lngLat => lngLat[0]);
    const latitudes = coordinates.map(lngLat => lngLat[1]);
    return [
        getMiddleOfSortedArray(longitudes),
        getMiddleOfSortedArray(latitudes),
    ];
}

/**
 * Converts an array of arrays with longitude and latitude values to an array of LatLng objects.
 * Arrays with longitude and latitude values are the format used in GeoJSON files.
 * @param {Array<[number,number]> | [number,number]} coordinates - An array of arrays with longitude in
 * the first position and latitude in the second position, or a single array with longitude in the
 * first position and latitude in the second position 
*/
export function toLatLng(coordinates: Array<[number,number]>) : Array<LatLng>;
export function toLatLng(coordinates: [number,number]) : LatLng;
export function toLatLng(coordinates: any) : any {
    if(typeof(coordinates[0]) === 'number'){
        return {lat: coordinates[1], lng: coordinates[0]};
    }
    else {
        return coordinates.map((lngLat: number[]) => ({lat:lngLat[1], lng:lngLat[0]}));
    }
}