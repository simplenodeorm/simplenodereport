import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {getFontHeight, getReportColumn} from './helpers';
import {ReportObject} from './ReportObject';

const headerLoop = (data) => {
    return data.map((cinfo) => {
        return <th>{cinfo.name}</th>;
    });
};

const rowLoop = (data) => {
    return data.map((row) => {
        return <tr>{columnLoop(row)}</tr>;
    });
};

const columnLoop = (row) => {
    return row.map((col) => {
        return <td>{col}</td>;
    });
};

class DBDataReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }

    getObjectData() {
        let headerHeight = getFontHeight(this.props.config.headerFontSettings.fontName, this.props.config.headerFontSettings.fontSize);
        let dataRowHeight = getFontHeight(this.props.config.dataFontSettings.fontName, this.props.config.dataFontSettings.fontSize);
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
            + ' {position: relative; overflow-x: hidden; overflow-y: auto; left: '
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

        css = '.' + objectData.cssClassName
            + ' th {margin: 0; padding: 0; font-family:'
            + this.props.config.headerFontSettings.font
            + '; font-size: '
            + this.props.config.headerFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.headerFontSettings.fontWeight
            + '; color: '
            + this.props.config.headerFontSettings.fontColor
            + '; background-color: '
            + this.props.config.headerFontSettings.backgroundColor
            + '; text-align: center;} ';
        style.appendChild(document.createTextNode(css));

        for (let i = 0; i < objectData.objectColumns.length; ++i) {
            css = '.' + objectData.cssClassName + ' th:nth-child('
                + (i+1)
                + ') { width: '
                + (Math.round(objectData.objectColumns[i].width/config.zoomFactor) + 'px;')
                + '} ';
            style.appendChild(document.createTextNode(css));
        }

        css = '.' + objectData.cssClassName + ' td {'
            + 'font-family: '
            + this.props.config.dataFontSettings.font
            + '; font-size: '
            + this.props.config.dataFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.dataFontSettings.fontWeight
            + '; color: '
            + this.props.config.dataFontSettings.fontColor
            + '; background-color: '
            + this.props.config.dataFontSettings.backgroundColor
            + ';} ';
        style.appendChild(document.createTextNode(css));

    }
}

    
export {DBDataReportObject};