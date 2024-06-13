import tokml from '@jlandrum/tokml';
import {
  getTranslations,
  formatDate,
  getSupplierStatus,
  zeroPad,
} from '@/utils/functions';
import {
  ReportData,
  SupplierData,
  GeoJsonLngLat,
  I18n,
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonBBox,
} from '@/typing/types';
import Excel, { Workbook, Worksheet } from 'exceljs';
import { i18nConfig } from '@/config/i18n';
import {
  borderStyle,
  cellAlignment,
  cellFillLight,
  cellFillDark,
  cellFontRed,
  cellFontGreen,
  columnHeaderFill,
  headerFont,
  sheetHeaderFill,
} from '@/config/exceljs-styles';

function getBBox(coordinates: GeoJsonLngLat[]): GeoJsonBBox {
  const longitudes: number[] = coordinates.map(lngLat => lngLat[0]);
  const latitudes: number[] = coordinates.map(lngLat => lngLat[1]);
  return [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ];
}

/**
 * Creates an Anchor element in the DOM that automatically downloads a file with the provided content.
 * @param {string} content - Content to be downloaded, such as a JSON or a XML string.
 * @param {string} filename - Filename for the downloaded file.
 * @param {string} extension - File extension for the downloaded file.
 */
function downloadFile(content: string, filename: string, extension: string) {
  const link = document.createElement('a');
  link.href = content;
  link.download = `${filename}.${extension}`;
  link.click();
}

/**
 * Returns the filename for downloaded files based in the provided data.
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - A date string in the ISO 8601 format.
 */
function getDownloadFilename(
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

/**
 * Converts application data into a GeoJSON compatible object.
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 */
function getGeoJsonObject(data: ReportData): GeoJsonFeatureCollection;
function getGeoJsonObject(data: SupplierData): GeoJsonFeature;
function getGeoJsonObject(
  data: ReportData | SupplierData
): GeoJsonFeature | GeoJsonFeatureCollection;
function getGeoJsonObject(data: ReportData | SupplierData): any {
  // data typeof ReportData
  if ('suppliers' in data) {
    let geoJsonObj: GeoJsonFeatureCollection = {
      type: '',
      features: [],
    };
    geoJsonObj.type = 'FeatureCollection';
    let allCoordinates: GeoJsonLngLat[] = [];
    data.suppliers.forEach(supplier => {
      geoJsonObj.features.push(getGeoJsonObject(supplier));
      allCoordinates = allCoordinates.concat(supplier.coordinates);
    });
    geoJsonObj.bbox = getBBox(allCoordinates);
    return geoJsonObj;
  }
  // data typeof SupplierData
  else if ('coordinates' in data) {
    let geoJsonObj: GeoJsonFeature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [data.coordinates],
      },
      bbox: getBBox(data.coordinates),
      properties: {
        farmId: data.farmId,
        city: data.city,
        state: data.state,
        area: data.area,
      },
    };
    return geoJsonObj;
  } else {
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }
}

function polygonToWKT(coordinates: GeoJsonLngLat[]): string {
  return `POLYGON((${coordinates
    .map(lngLat => `${lngLat[0]} ${lngLat[1]}`)
    .join(', ')}))`;
}

/**
 * Generates an Exceljs Worksheet from the provided data and adds it to an existing Exceljs Workbook.
 * @param {ReportData | SupplierData} data - A data object.
 * @param {Workbook} workbook - An existing Exceljs workbook.
 * @param {I18n} i18n - A next-intl translator object to be used in column names.
 * @param {string} [lang] - The current language to be used for i18n.
 * @param {string | number} [index] - An index to be added to sheet names to avoid name collisions.
 */
function addExcelSheet(params: {
  data: ReportData | SupplierData;
  workbook: Workbook;
  i18n: I18n;
  lang?: string;
  index?: string | number;
}): void {
  const { data, workbook, i18n, lang, index } = params;
  let sheet: Worksheet | undefined = undefined;
  // data typeof ReportData
  if ('suppliers' in data) {
    const columnNames = [
      i18n('geolocationPanel.farmId'),
      i18n('reportsPanel.status'),
      i18n('geolocationPanel.city'),
      i18n('geolocationPanel.state'),
      i18n('geolocationPanel.area'),
      i18n('geolocationPanel.coordinates'),
      'WKT',
    ];
    sheet = workbook.addWorksheet(
      encodeURI(data.orderNumber.replace('/', '-')).slice(0, 31)
    );
    sheet.columns = [
      { key: 'farmId', header: columnNames[0], width: 50 },
      { key: 'status', header: columnNames[1], width: 15 },
      { key: 'city', header: columnNames[2], width: 35 },
      { key: 'state', header: columnNames[3], width: 8 },
      { key: 'area', header: columnNames[4], width: 15 },
      { key: 'coordinates', header: columnNames[5], width: 250 },
      { key: 'wkt', header: columnNames[6], width: 250 },
    ];

    //Moving table header to second row
    sheet.duplicateRow(1, 2, true);
    //Adding sheet header before table header
    sheet.getRow(1).values = [
      `Exportadora de Café Guaxupé Ltda.  -  ${i18n('navbar.title')}`,
    ];
    sheet.getRow(2).values = [
      `${i18n('orderDetails.orderNumber')}:  ${data.orderNumber}        ` +
        `${i18n('orderDetails.date')}:  ${formatDate(data.orderDate)}       ` +
        `${i18n('orderDetails.volume')}: ${data.volume}        ` +
        `${i18n('orderDetails.supplierNumber')}: ${data.suppliers.length}`,
    ];
    sheet.mergeCells(1, 1, 1, 7); // Row Start, Col Start, Row End, Col End
    sheet.mergeCells(2, 1, 2, 7); // Row Start, Col Start, Row End, Col End

    data.suppliers.forEach((supplier, supplierIndex) => {
      const status = i18n(
        `reportsPanel.${
          getSupplierStatus(supplier) === 'HIGH'
            ? 'statusLocked'
            : 'statusUnlocked'
        }`
      );
      sheet!.addRow({
        farmId: supplier.farmId,
        status: status,
        city: supplier.city,
        state: supplier.state,
        area: +supplier.area, // '+' to force number values
        coordinates: JSON.stringify(supplier.coordinates),
        wkt: polygonToWKT(supplier.coordinates),
      });
      addExcelSheet({
        data: supplier,
        workbook: workbook,
        i18n: i18n,
        index: supplierIndex + 1,
        lang: lang,
      });
    });
  }
  // data typeof SupplierData
  else if ('coordinates' in data) {
    sheet = workbook.addWorksheet(
      encodeURI(`${index ? index + '-' : ''}${data.farmId}`).slice(0, 31)
    );
    sheet.columns = [
      { key: 'id', header: i18n('reportsPanel.id'), width: 40 },
      { key: 'status', header: i18n('reportsPanel.status'), width: 15 },
      { key: 'name', header: i18n('reportsPanel.name'), width: 50 },
      {
        key: 'institution',
        header: i18n('reportsPanel.institution'),
        width: 50,
      },
      { key: 'details', header: i18n('reportsPanel.details'), width: 90 },
    ];

    //Moving table header to second row
    sheet.duplicateRow(1, 2, true);
    //Adding sheet header before table header
    sheet.getRow(1).values = [
      `Exportadora de Café Guaxupé Ltda.  -  ${i18n('navbar.title')}`,
    ];
    sheet.getRow(2).values = [
      `${i18n('geolocationPanel.farmId')}:  ${data.farmId}`,
    ];
    sheet.mergeCells(1, 1, 1, 5); // Row Start, Col Start, Row End, Col End
    sheet.mergeCells(2, 1, 2, 5); // Row Start, Col Start, Row End, Col End

    data.protocol.forEach(protocolItem => {
      const isLocked = protocolItem.status === 'HIGH';
      sheet!.addRow({
        id: protocolItem.type,
        status: i18n(
          `reportsPanel.${isLocked ? 'statusLocked' : 'statusUnlocked'}`
        ),
        name: i18n(`reportsPanel.protocolItems.${protocolItem.type}.name`),
        institution: i18n(
          `reportsPanel.protocolItems.${protocolItem.type}.institution`
        ),
        details:
          (params.lang ?? i18nConfig.defaultLocale) === 'pt'
            ? protocolItem.details
            : i18n(
                `reportsPanel.protocolItems.${protocolItem.type}.${
                  isLocked ? 'lockedDetails' : 'unlockedDetails'
                }`
              ) +
              (isLocked ? ` Original Details: "${protocolItem.details}"` : ''),
      });
    });
  }
  if (sheet) setExcelSheetStyle(sheet!, params.i18n);
}

/**
 * Sets the custom style defined in config/exceljs-styles.ts to an Exceljs worksheet
 * @param {Worksheet} worksheet - An Exceljs worksheet.
 * @param {I18n} i18n - A next-intl translator object to be used in column names.
 */
function setExcelSheetStyle(worksheet: Worksheet, i18n: I18n) {
  worksheet.eachRow({ includeEmpty: false }, (row, rowIndex) => {
    row.eachCell({ includeEmpty: false }, (cell, _) => {
      // All cells style
      cell.border = borderStyle;
      cell.alignment = cellAlignment;
      // Sheet table & header style
      if (rowIndex <= 3) {
        row.height = 25;
        cell.font = headerFont;
        if (rowIndex <= 2) {
          cell.fill = sheetHeaderFill;
        } else if (rowIndex === 3) {
          cell.fill = columnHeaderFill;
        }
      }
      // Rows style
      else {
        if (rowIndex % 2 == 0) {
          cell.fill = cellFillDark;
        } else {
          cell.fill = cellFillLight;
        }
      }
    });
    const statusCell = row.getCell('status');
    if (statusCell.value === i18n('reportsPanel.statusUnlocked'))
      statusCell.font = cellFontGreen;
    if (statusCell.value === i18n('reportsPanel.statusLocked'))
      statusCell.font = cellFontRed;
  });
}

/**
 * Downloads a XLSX file containing the application data
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - An ISO 8601 date string.
 */
export async function downloadExcel(
  data: ReportData | SupplierData,
  isoDate?: string,
  lang?: string
) {
  const filename: string = getDownloadFilename(data, isoDate);
  let workbook = new Excel.Workbook();
  const i18n = await getTranslations(lang, 'reportPage.labels');

  addExcelSheet({
    data: data,
    workbook: workbook,
    i18n: i18n,
    lang: lang,
  });

  workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });
    const xlsxString = URL.createObjectURL(blob);
    downloadFile(xlsxString, filename, 'xlsx');
  });
}

/**
 * Downloads a GeoJSON file containing the application data
 * @param {ReportData | SupplierData} data - Full order data or single supplier data
 * @param {string} isoDate - A date string in the ISO 8601 format.
 */
export function downloadGeoJSON(
  data: ReportData | SupplierData,
  isoDate?: string
) {
  const filename: string = getDownloadFilename(data, isoDate);
  const geoJsonObj = getGeoJsonObject(data);
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(geoJsonObj)
  )}`;
  downloadFile(jsonString, filename, 'json');
}

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
