import React from 'react';
import "../app/App.css";
import {getFontHeight, getReportColumn} from './helpers';
import {ReportObject} from './ReportObject';

const headerLoop = (data) => {
    return data.map((cinfo, i) => {
        return <th><div>{cinfo.name}</div></th>;
    });
};

const rowLoop = (data) => {
    return data.map((row) => {
        return <tr>{columnLoop(row)}</tr>;
    });
};

const columnLoop = (row) => {
    return row.map((col) => {
        return <td><div>{col}</div></td>;
    });
};

class DBDataReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }

    getObjectData() {
        let headerHeight = getFontHeight(this.props.config.headerFontSettings.font, this.props.config.headerFontSettings.fontSize) + this.getConfigValue('tablecellpadding');
        let dataRowHeight = getFontHeight(this.props.config.dataFontSettings.font, this.props.config.dataFontSettings.fontSize) + this.getConfigValue('tablecellpadding');
        let numRows = ((this.props.config.rect.height - headerHeight)/ dataRowHeight);
        let columns = [];
        let objectColumns = [];
        for (let i = 0; i < this.props.config.reportColumns.length; ++i) {
            if (this.props.config.reportColumns[i].displayResult) {
                columns.push(getReportColumn(this.props.config.reportColumns[i].key))
                objectColumns.push(this.props.config.reportColumns[i]);
            }
        }


        let data = [];

        for (let i = 0; i < numRows; ++i) {
            let row = [];
            for (let j = 0; j < columns.length; ++j) {
                row.push('r' + i + 'c' + j);
            }
            data.push(row);
        }

        return {
            cssClassName: this.getCssClassName(),
            numRows: numRows,
            columns: columns,
            headerHeight: headerHeight,
            dataRowHeight: dataRowHeight,
            data: data,
            objectColumns: objectColumns

        };
    }

    getContent(objectData) {
        return <table>
            <thead><tr>{ headerLoop(objectData.columns) }</tr></thead>
            <tbody>{ rowLoop(objectData.data) }</tbody>
        </table>;
    }

    loadCss(objectData) {
        let style = document.getElementsByTagName('style')[0];
        let css = '.' + objectData.cssClassName
            + ' {position: relative; overflow: hidden; left: '
            + this.props.config.rect.left
            + 'px; top: '
            + this.props.config.rect.left
            + 'px; width: '
            + (this.props.config.rect.width )
            + 'px; height: '
            + this.props.config.rect.height
            + 'px;} ';
        style.appendChild(document.createTextNode(css));

        style.appendChild(document.createTextNode('.'
            + objectData.cssClassName
            + ' table { border-spacing: 0; border-collapse: collapse; }'));

        style.appendChild(document.createTextNode('.' + objectData.cssClassName + ' th {margin: 0; padding: 0;}'));

        css = '.' + objectData.cssClassName
            + ' th div {margin: 0; padding: 0; font-family:'
            + this.props.config.headerFontSettings.font
            + '; font-size: '
            + this.props.config.headerFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.headerFontSettings.fontWeight
            + '; color: '
            + this.props.config.headerFontSettings.fontColor
            + '; height: '
            + objectData.headerHeight
            + 'px; background-color: '
            + this.props.config.headerFontSettings.backgroundColor
            + '; text-align: center; }';

        css = '.' + objectData.cssClassName + ' th {overflow: hidden; ';

        if (this.hasBorder(this.props.config.headerBorderSettings)) {
            if (this.hasFullBorder(this.props.config.headerBorderSettings)) {
                css += this.buildBorderCss('border', this.props.config.headerBorderSettings);
            } else {
                if (this.props.config.headerBorderSettings.left) {
                    css += this.buildBorderCss('border-left', this.props.config.headerBorderSettings);
                }
                if (this.props.config.headerBorderSettings.top) {
                    css += this.buildBorderCss('border-top', this.props.config.headerBorderSettings);
                }
                if (this.props.config.headerBorderSettings.right) {
                    css += this.buildBorderCss('border-right', this.props.config.headerBorderSettings);
                }
                if (this.props.config.headerBorderSettings.bottom) {
                    css += this.buildBorderCss('border-bottom', this.props.config.headerBorderSettings);
                }
            }
        }
        css += '} ';


        style.appendChild(document.createTextNode(css));

        for (let i = 0; i < objectData.objectColumns.length; ++i) {
            css = 'div.' + objectData.cssClassName + ' th div:nth-child('
                + (i+1)
                + ') { width: '
                + (Math.round(objectData.objectColumns[i].width) + 'px;')
                + '} ';
            style.appendChild(document.createTextNode(css));
        }

        style.appendChild(document.createTextNode('.' + objectData.cssClassName + ' td {margin: 0; padding: 0;}'));
        css = '.' + objectData.cssClassName + ' td div {font-family: '
            + this.props.config.dataFontSettings.font
            + '; font-size: '
            + this.props.config.dataFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.dataFontSettings.fontWeight
            + '; color: '
            + this.props.config.dataFontSettings.fontColor
            + '; height: '
            + objectData.dataRowHeight
            + 'px; background-color: '
            + this.props.config.dataFontSettings.backgroundColor
            + ';} ';
        css = '.' + objectData.cssClassName + ' td {overflow: hidden; ';
        if (this.hasBorder(this.props.config.dataBorderSettings)) {
            if (this.hasFullBorder(this.props.config.headerBorderSettings)) {
                css += this.buildBorderCss('border', this.props.config.dataBorderSettings);
            } else {
                if (this.props.config.dataBorderSettings.left) {
                    css += this.buildBorderCss('border-left', this.props.config.dataBorderSettings);
                }
                if (this.props.config.dataBorderSettings.top) {
                    css += this.buildBorderCss('border-top', this.props.config.dataBorderSettings);
                }
                if (this.props.config.dataBorderSettings.right) {
                    css += this.buildBorderCss('border-right', this.props.config.dataBorderSettings);
                }
                if (this.props.config.dataBorderSettings.bottom) {
                    css += this.buildBorderCss('border-bottom', this.props.config.dataBorderSettings);
                }
            }
        }
        css += '} ';
        style.appendChild(document.createTextNode(css));

    }
}

    
export {DBDataReportObject};