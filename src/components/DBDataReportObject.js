/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import {getFontHeight, getModalContainer, getReportColumn, copyObject} from './helpers';
import {ReportObject} from './ReportObject';
import config from "../config/appconfig";
import ReactDOM from "react-dom";
import {DBDataGridSetupPanel} from "./DBDataGridSetupPanel";

const headerLoop = (columns, objectColumns) => {
    return columns.map((cinfo, i) => {
        const myStyle = {
            width: objectColumns[i].width + 'px'
        };
        return <th style={myStyle}><div>{cinfo.name}</div></th>;
    });
};

const rowLoop = (data, objectColumns) => {
    return data.map((row) => {
        return <tr>{columnLoop(row, objectColumns)}</tr>;
    });
};

const columnLoop = (row, objectColumns) => {
    return row.map((col, i) => {
        if (objectColumns[i].specialHandlingType && objectColumns[i].specialHandlingType !== 'none') {
            return <td><div>{objectColumns[i].specialHandlingType}</div></td>;
            
        } else {
            return <td><div>{col}</div></td>;
        }
    });
};

class DBDataReportObject extends ReportObject {
    constructor(props) {
        super(props);
        this.getObjectData = this.getObjectData.bind(this);
    }

    getObjectData() {
        const {height} = this.state;
        let columns = [];
        let objectColumns = [];

        for (let i = 0; i < this.props.config.reportColumns.length; ++i) {
            if (this.props.config.reportColumns[i].displayResult) {
                let dbcol = getReportColumn(this.props.config.reportColumns[i].key);
                if (dbcol) {
                    columns.push(dbcol);
                    objectColumns.push(this.props.config.reportColumns[i]);
                }
            }
        }
    
        let headerHeight = this.getHeaderHeight(columns, objectColumns) +
            this.getConfigValue('defaulttablecellpadding');
        let dataRowHeight = this.props.config.dataRowHeight;
        
        if (!dataRowHeight) {
            dataRowHeight = getFontHeight(this.props.config.dataFontSettings.font,
                this.props.config.dataFontSettings.fontSize) +
                this.getConfigValue('defaulttablecellpadding');
        }
        this.props.config.headerHeight = headerHeight;
        this.props.config.dataRowHeight = dataRowHeight;
        let numRows = Math.floor(height / dataRowHeight);
    
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
            <thead><tr>{ headerLoop(objectData.columns, objectData.objectColumns) }</tr></thead>
            <tbody>{ rowLoop(objectData.data, objectData.objectColumns) }</tbody>
        </table>;
    }

    getHeaderHeight(columns, objectColumns) {
        let retval = 0;
        if (!this.props.config.headerHeight) {
            for (let i = 0; i < columns.length; ++i) {
                let fh = getFontHeight(this.props.config.headerFontSettings.font,
                    this.props.config.headerFontSettings.fontSize,
                    objectColumns[i].width, columns[i].name);
                + this.getConfigValue('defaulttablecellpadding');
                if (Math.max(fh, retval) > retval) {
                    retval = fh;
                }
            }
        } else {
            retval = this.props.config.headerHeight;
        }
        return retval;
    }
    
    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
    
        this.addBaseReportObjectCss(style, objectData.cssClassName);
        
        style.appendChild(document.createTextNode('.'
            + objectData.cssClassName
            + ' table { table-layout: fixed; border-spacing: 0; border-collapse: collapse; margin: 1px} '));
    
        let fontStyle = 'normal';
        let textDecoration = 'none';
        
        if (this.props.config.headerFontSettings.italic) {
            fontStyle = 'italic';
        }
    
        if (this.props.config.headerFontSettings.underlined) {
            textDecoration = 'underline';
        }
    
        let css = '.' + objectData.cssClassName
            + ' th div {margin: 0; padding: 0; font-family:'
            + this.props.config.headerFontSettings.font
            + '; font-size: '
            + this.props.config.headerFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.headerFontSettings.fontWeight
            + '; color: '
            + this.props.config.headerFontSettings.fontColor
            + '; font-style: '
            + fontStyle
            + '; text-decoration: '
            + textDecoration
            + '; height: '
            + objectData.headerHeight
            + 'px; background-color: '
            + this.props.config.headerFontSettings.backgroundColor
            + '; text-align: center; } ';
        style.appendChild(document.createTextNode(css));

        css = '.' + objectData.cssClassName
            + ' th {overflow: hidden; margin: 0; padding: 0; ';
    
        this.props.config.totalsSeparator = config.dbDataTotalsSeparator;
        
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
    
        fontStyle = 'normal';
        textDecoration = 'none';

        if (this.props.config.dataFontSettings.italic) {
            fontStyle = 'italic';
        }
    
        if (this.props.config.dataFontSettings.underlined) {
            textDecoration = 'underline';
        }
    
        style.appendChild(document.createTextNode('.' + objectData.cssClassName + ' td {margin: 0; padding: 0;} '));
        css = '.' + objectData.cssClassName + ' td div {overflow: hidden; font-family: '
            + this.props.config.dataFontSettings.font
            + '; font-size: '
            + this.props.config.dataFontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.dataFontSettings.fontWeight
            + '; color: '
            + this.props.config.dataFontSettings.fontColor
            + '; font-style: '
            + fontStyle
            + '; text-decoration: '
            + textDecoration
            + '; height: '
            + objectData.dataRowHeight
            + 'px; background-color: '
            + this.props.config.dataFontSettings.backgroundColor
            + ';} ';
        style.appendChild(document.createTextNode(css));

        for (let i = 0; i < objectData.objectColumns.length; ++i) {
            css = 'div.' + objectData.cssClassName + ' tr td:nth-child('
                + (i+1)
                + ') { text-align: '
                + objectData.objectColumns[i].textAlign
                + ';} ';
             style.appendChild(document.createTextNode(css));
        }

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
        return style;

    }
    
    getDefaultRect(){
        return {top: 20, left: 20, height: 200, width: 300};
    }
    
    getCustomResizeCursor(clientRect, mouseX, mouseY) {
        let retval = '';
        let node = document.elementFromPoint(mouseX, mouseY).parentNode;
        if ((node.nodeName === 'TD') || (node.nodeName === 'TH')) {
            let rc = node.getBoundingClientRect();
            if (Math.abs(rc.right - mouseX) <= config.resizeMargin) {
                retval = config.columnResizeCursor;
            } else if (Math.abs((rc.top + rc.height) - mouseY) <= config.resizeMargin) {
                retval = config.rowResizeCursor;
            }
        }
    
        return retval;
    }
    
    getCustomData(clientX, clientY, screenX, screenY) {
        return this.getResizeColumn(clientX, clientY, screenX, screenY);
    }
    
    getResizeColumn(clientX, clientY, screenX) {
        let retval;
        let node = document.elementFromPoint(clientX, clientY).parentNode;
        if (node.nodeName === 'TD') {
            retval = [].indexOf.call(node.parentNode.children, node);
            let rc = node.getBoundingClientRect();
            
            if ((screenX-clientX) < rc.left) {
                retval--;
            }
        }
        
        return retval;
    }
    
    isCustomResizeCursor(cursor) {
        return ((cursor === config.columnResizeCursor)
            || (cursor === config.rowResizeCursor));
    }
    
    handleCustomResize(info, cursor) {
        let node = document.elementFromPoint(this.startInfo.clientX, this.startInfo.clientY).parentNode;
        if ((node.nodeName === 'TD') || (node.nodeName === 'TH')) {
            if (cursor === config.rowResizeCursor) {
                if (node.nodeName === 'TH') {
                    this.props.config.headerHeight += (info.screenY - this.startInfo.y);
                } else {
                    this.props.config.dataRowHeight += (info.screenY - this.startInfo.y);
                }
                this.setState(this.state);
            } else if (cursor === config.columnResizeCursor) {
                let index = [].indexOf.call(node.parentNode.children, node);
                let rc = node.getBoundingClientRect();
                let width = rc.width;
        
                if (index >= 0) {
                    let delta = (info.screenX - this.startInfo.x);
                    let reportColumnIndex = 0;
            
                    for (let i = 0; i < this.props.config.reportColumns.length; ++i) {
                        if (this.props.config.reportColumns[i].displayResult) {
                            if (index === reportColumnIndex) {
                                if (Math.abs(this.props.config.reportColumns[i].width + delta) > 5) {
                                    this.props.config.reportColumns[i].width += delta;
                                }
                                break;
                            }
                            reportColumnIndex++;
                        }
                    }
                    let updateWidth = 0;
                    let updateCount = 0;
                    for (let i = reportColumnIndex + 1; i < this.props.config.reportColumns.length; ++i) {
                        if (this.props.config.reportColumns[i].displayResult)  {
                            updateWidth += this.props.config.reportColumns[i].width;
                            updateCount++;
                        }
                    }


                   if (updateCount > 0) {
                       let change = Math.round((updateWidth - delta) / updateCount);
                       for (let i = reportColumnIndex + 1; i < this.props.config.reportColumns.length; ++i) {
                           if (this.props.config.reportColumns[i].displayResult) {
                               this.props.config.reportColumns[i].width -= change;
                           }
                       }
                   }

                    this.setState(this.state);
                }
            }
        }
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 600, height: 450};
        let mc = getModalContainer(rc);
        ReactDOM.render(<DBDataGridSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
    
    }
}

    
export {DBDataReportObject};