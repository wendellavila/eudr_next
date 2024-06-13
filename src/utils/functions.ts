import { createTranslator } from 'next-intl';
import { i18nConfig } from '@/config/i18n';
import { SupplierData, I18n } from '@/typing/types';

/**
 * Get supplier status based on protocol status
 * @param {SupplierData} data - Supplier data
 */
export function getSupplierStatus(supplier: SupplierData): string {
  return supplier.protocol.filter(
    protocolItem => protocolItem.status === 'HIGH'
  ).length > 0
    ? 'HIGH'
    : 'NO_ALERT';
}

/**
 * Adds a leading zero to integers less than 10.
 * @param {number} n - An integer number.
 */
export function zeroPad(n: number): string {
  return (n < 10 ? '0' : '') + n;
}

/**
 * Formats date in the format yyyymmdd into dd/mm/yyyy
 * @param {string} date - A date in the format yyyymmdd.
 */
export function formatDate(date: string) {
  return `${date.substring(6, 8)}/${date.substring(4, 6)}/${date.substring(
    0,
    4
  )}`;
}

/**
 * Loads JSON files containing translations to be used for Internationalization.
 * @param {string} locale - The locale of the language to be loaded.
 */
export async function getTranslationMessages(locale: string) {
  return (await import(`@/i18n/translations_${locale}.json`)).default;
}

/**
 * Creates a next-intl translator to be used outside of client components.
 * @param {string} locale - The locale of the language to be loaded.
 */
export async function getTranslations(
  locale?: string,
  namespace?: string
): Promise<I18n> {
  if (!locale) locale = i18nConfig.defaultLocale;
  const translator = createTranslator({
    locale,
    messages: await getTranslationMessages(locale),
    namespace: namespace,
  });
  return translator.raw;
}
