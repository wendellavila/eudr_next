import tokml from '@jlandrum/tokml';
import { ReportData, SupplierData } from '@/typing/types';
import { getGeoJsonObject } from './downloadGeoJson';
import { getDownloadFilename, downloadFile } from './downloadFile';

/**
 * Indents a XML string.
 * @param {string} xml - A XML string.
 * @param {string} tab- Custom tab character.
 * @param {string} nl - Custom newline character.
 */
function indentXML(xml: string, tab = '\t', nl = '\n') {
  let formatted = '',
    indent = '';
  const nodes = xml.slice(1, -1).split(/>\s*</);
  if (nodes[0][0] == '?') formatted += '<' + nodes.shift() + '>' + nl;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node[0] == '/') indent = indent.slice(tab.length); // decrease indent
    formatted += indent + '<' + node + '>' + nl;
    if (
      node[0] != '/' &&
      node[node.length - 1] != '/' &&
      node.indexOf('</') == -1
    )
      indent += tab; // increase indent
  }
  return formatted;
}

/**
 * Downloads a KML (Keyhole Markup Language) file containing the application data
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - A date string in the ISO 8601 format.
 */
export function downloadKML(data: ReportData | SupplierData, isoDate?: string) {
  const filename: string = getDownloadFilename(data, isoDate);
  const geoJsonObj = getGeoJsonObject(data);
  let kmlString = tokml(geoJsonObj);
  kmlString = indentXML(kmlString);
  kmlString = `data:application/xml;chatset=utf-8,${kmlString}`;
  downloadFile(kmlString, filename, 'kml');
}
