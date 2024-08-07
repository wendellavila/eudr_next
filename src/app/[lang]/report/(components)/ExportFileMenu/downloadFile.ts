import { zeroPad } from '@/utils/functions';
import { ReportData, SupplierData } from '@/typing/types';

/**
 * Creates an Anchor element in the DOM that automatically downloads a file with the provided content.
 * @param {string} content - Content to be downloaded, such as a JSON or a XML string.
 * @param {string} filename - Filename for the downloaded file.
 * @param {string} extension - File extension for the downloaded file.
 */
export function downloadFile(
  content: string,
  filename: string,
  extension: string
) {
  const link = document.createElement('a');
  link.href = content;
  link.download = `${filename}.${extension}`;
  link.click();
  link.remove();
}

/**
 * Returns the filename for downloaded files based in the provided data.
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - A date string in the ISO 8601 format.
 */
export function getDownloadFilename(
  data: ReportData | SupplierData,
  isoDate?: string
): string {
  let date = new Date(isoDate ?? '');
  if (isNaN(date.getDate())) date = new Date();

  const dateString =
    date.getFullYear() +
    zeroPad(date.getMonth() + 1) +
    zeroPad(date.getDate()) +
    '_' +
    zeroPad(date.getHours()) +
    zeroPad(date.getMinutes()) +
    zeroPad(date.getSeconds());

  let filenameStart = '';
  // data typeof ReportData
  if ('suppliers' in data) {
    filenameStart = `${encodeURI(data.orderNumber.replace('/', '-'))}_`;
  }
  // data typeof SupplierData
  else if ('coordinates' in data) {
    filenameStart = `${encodeURI(data.farmId)}_`;
  }
  return `${filenameStart}${dateString}`;
}
