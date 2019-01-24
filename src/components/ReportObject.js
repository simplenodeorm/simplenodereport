import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {getFontHeight, getReportColumn} from './helpers';


const headerLoop = (data) => {
    return data.map((cinfo) => {
        return <div className="hdr">{cinfo.name}</div>;
    });
};

const dataLoop = (numrows, columns, data) => {
    let retval = '';

    for (let i = 0; i < numrows; ++i) {
        retval += data[i].map((row, indx) => {
            return <div className="data">{row[indx]}</div>
        });
    }

    return retval;
};

class ReportObject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.config.objectType) {
            case 'dbdata':
                return this.getDBDataContent();
            break;
        }
    }

    getDBDataContent() {
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

        return <div className={this.getCssClass(columns, objectColumns)}>
            { headerLoop(columns) }
            { dataLoop(numRows, columns, data) }
        </div>;
    }

    getCssClass(columns, objectColumns) {
        let style = document.getElementsByTagName('style')[0];
        let retval = (document.designData.reportName + '_' + this.props.config.objectType + this.props.config.id);
        if (!style.innerHTML.includes('.' + retval)) {
            let css;
            switch(this.props.config.objectType) {
                case 'dbdata':
                    css = ' .' + retval
                        + ' {position: relative; display: grid; left: '
                        + this.props.config.rect.left
                        + 'px; top: '
                        + this.props.config.rect.left
                        + 'px; width: '
                        + this.props.config.rect.width
                        + 'px; height: '
                        + this.props.config.rect.height
                        + 'px; grid-template-columns: ';
                    for (let i = 0; i < objectColumns.length; ++i) {
                        css += ((objectColumns[i].width/config.zoomFactor) + 'px');
                        css + ' ';
                    }
                    css += ';} ';
                    css += ' ' + retval + ' .hdr {';
                    css += 'font-family:'
                        + this.props.config.headerFontSettings.fontName
                        + '; font-size: '
                        + this.props.config.headerFontSettings.fontSize
                        + 'pt; font-weight: '
                        + this.props.config.headerFontSettings.fontWeight
                        + '; color: '
                        + this.props.config.headerFontSettings.fontColor
                        + '; background-color: '
                        + this.props.config.headerFontSettings.fontColor
                        + ';} ';
                    css += ' ' + retval + ' .data {';
                    css += 'font-family:'
                        + this.props.config.dataFontSettings.fontName
                        + '; font-size: '
                        + this.props.config.dataFontSettings.fontSize
                        + 'pt; font-weight: '
                        + this.props.config.dataFontSettings.fontWeight
                        + '; color: '
                        + this.props.config.dataFontSettings.fontColor
                        + '; background-color: '
                        + this.props.config.dataFontSettings.fontColor
                        + ';} ';
                    break;
            }

            style.innerHTML = style.innerHTML + css;
        }

        return retval;
    }

}

    
export {ReportObject};