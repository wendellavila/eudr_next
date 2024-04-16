import { Alignment,Borders,FillPattern,Font,Style } from 'exceljs';

export const cellAlignment: Alignment = {
    vertical: 'middle',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: false,
    indent: 0,
    readingOrder: 'ltr',
    textRotation: 0
};
export const borderStyle: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
}
export const headerFont: Partial<Font> = {
    bold: true,
    color: { argb: 'FFFFFFFF' }
}

export const sheetHeaderFill: FillPattern = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4F6525' }
}

export const columnHeaderFill: FillPattern = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF76933C' }
}

export const cellFontRed: Partial<Font> = {
    color: { argb: 'FFDC2626' }
}

export const cellFontGreen: Partial<Font> = {
    color: { argb: 'FF16A34A' }
}

export const cellFillLight: FillPattern = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF9F4F1' }
}

export const cellFillDark: FillPattern = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF2E6DE' }
}