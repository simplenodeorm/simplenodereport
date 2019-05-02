import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config/appconfig.json';
import defaults from "../config/defaults";

document.designData = {
    currentReport: {}
};

const popupMenuClick = function(e) {
    let cm = document.getElementById('ctxmenu');
    if (!isPointInRect(e.pageX, e.pageY, cm.getBoundingClientRect())) {
       clearContextMenu();
    }
};

let ppi;

export function clearDocumentDesignData() {
    document.designData = '';
}

export function getPrecision(dbType) {
    let retval = 0;
    let pos = dbType.indexOf(',');
    if (pos > 0) {
        let pos2 = dbType.indexOf(')', pos);
        
        if (pos2 > pos) {
            retval = Number(dbType.substring(pos+1, pos2).trim())
        }
    }
    
    return retval;
}

export function getFieldType(dbType) {
    let retval;
    let check = dbType.toLowerCase();
    if (check.startsWith('number')
        || check.startsWith('decimal')
        || check.startsWith('numeric')) {
        check = 'number';
    }
    switch (check) {
        case 'date':
        case 'timestamp':
            retval = 'date';
            break;
        case 'number':
            if (dbType.includes(',')) {
                retval = 'float';
            } else {
                retval = 'number';
            }
            break;
        case 'float':
        case 'double':
            retval = 'float';
            break;
        case 'integer':
        case 'long':
            retval = 'number';
            break;
        default:
            retval = 'string';
            break;
    }

    return retval;
}

export function clearContextMenu() {
    let cm = document.getElementById('ctxmenu');
    
    if (cm) {
        ReactDOM.unmountComponentAtNode(cm);
        cm.parentNode.removeChild(cm);
        document.removeEventListener('click', popupMenuClick, true);
    }
}

export function getContextMenu(info) {
    clearContextMenu();
    const retval = document.createElement('div');
    retval.className = 'popupMenu';
    retval.id = 'ctxmenu';
    document.body.appendChild(retval);
    document.addEventListener('click', popupMenuClick, true);
    retval.style.position = 'absolute';
    let yOffset = 0;
    let xOffset = 0;
    if (info.yOffset) {
        yOffset = info.yOffset;
    }
    if (info.xOffset) {
        xOffset = info.xOffset;
    }
    
    if (info.event) {
        retval.style.top = info.event.pageY + yOffset + 'px';
        retval.style.left = info.event.pageX + xOffset + 'px';
    } else {
        retval.style.top = info.pageY + yOffset + 'px';
        retval.style.left = info.pageX + xOffset + 'px';
        
    }
    
    retval.style.visibility = 'visible';
    return retval;
}

export function getModalContainer(rc) {
    const retval = document.createElement('div');
    retval.className = 'modalContainer';
    retval.id = 'modalcontainer';
    document.body.appendChild(retval);
    retval.style.position = 'absolute';
    retval.style.top = rc.top + 'px';
    retval.style.left = rc.left + 'px';
    retval.style.width = rc.width + 'px';
    retval.style.height = rc.height + 'px';
    retval.style.visibility = 'visible';
    return retval;
}

export function clearModalContainer() {
    const mcdom = document.getElementById('modalcontainer');
    if (mcdom) {
        ReactDOM.unmountComponentAtNode(mcdom);
        mcdom.parentNode.removeChild(mcdom);
        document.removeEventListener('click', mcdom.clickFunction, true);
    
    }
}

export function getWaitMessage() {
    const retval = document.createElement('div');
    retval.className = 'modalContainer';
    retval.id = 'waitmsg';
    document.body.appendChild(retval);
    retval.style.position = 'absolute';
    retval.style.top = '100px';
    retval.style.left = '200px';
    retval.style.width = '275px';
    retval.style.height = '30px';
    retval.style.border = 'none';
    retval.style.visibility = 'visible';
    return retval;
}

export function removeWaitMessage() {
    let wm = document.getElementById('waitmsg');
    if (wm) {
        ReactDOM.unmountComponentAtNode(wm);
        wm.parentNode.removeChild(wm);
    }
}

export function getUniqueKey() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function isUnaryOperator(op) {
    return (op && ((op === 'is null') || (op === 'is not null')));
}

export function clearSelectedText() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        }
        else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    }
    else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

 export function copyToClipboard(className) {
    let e = document.getElementsByClassName(className)[0];
    try {
        if (e) {
            let range;
            if (document.selection) { // IE
                range = document.body.createTextRange();
                range.moveToElementText(e);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(e);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }

            document.execCommand('copy');
            clearSelectedText();

        }
    } 
        
     catch (err) {}
}

export function getPixelsPerInch() {
    if (!ppi) {
        let dpiHtmlStyle = 'data-dpi-test { height: 1in; left: -100%; position: absolute; top: -100%; width: 1in; }';
        let head = document.getElementsByTagName('head')[0];
        let dpiElement = document.createElement('style');
        dpiElement.setAttribute('type', 'text/css');
        dpiElement.setAttribute('rel', 'stylesheet');
        dpiElement.innerHTML = dpiHtmlStyle;
        head.appendChild(dpiElement);

        let body = document.getElementsByTagName('body')[0];
        let dpiTestElement = document.createElement('data-dpi-test');
        dpiTestElement.setAttribute('id', 'dpi-test');
        body.appendChild(dpiTestElement);
        ppi = document.getElementById('dpi-test').offsetHeight/config.zoomFactor;
    }
    
    return ppi;
}

export function getFontHeight(fontName, fontSize, text) {
    if (!text) {
        text = 'XXXXXXXXXXXXXXX'
    }
    
    return Math.ceil(getTextRect(fontName, fontSize, text).height / config.zoomFactor);
}

export function getTextRect(fontName, fontSize, text) {
    let height = Math.ceil(fontSize * config.pointToPixelFactor);
    let width = Math.ceil(text.length * height / config.pointToPixelHeightFactor);
    return  {left: 0, top: 0, height: height, width: width};
}

export function getDocumentDimensions(type, orientation) {
    let retval = [8.5, 11];
    switch(type.toUpperCase()) {
        case '4A0':
            retval = [66.2,93.6];
            break;
        case '2A0':
            retval = [46.8,66.2];
            break;
        case 'A0':
            retval = [33.1,46.8];
            break;
        case 'A1':
            retval = [23.4,33.1];
            break;
        case 'A2':
            retval = [16.5,23.4];
            break;
        case 'A3':
            retval = [11.7,16.5];
            break;
        case 'A4':
            retval = [8.3,11.7];
            break;
        case 'A5':
            retval = [5.8,8.3];
            break;
        case 'A6':
            retval = [4.1,5.8];
            break;
        case 'A7':
            retval = [2.9, 4.1];
            break;
        case 'A8':
            retval = [2.0,2.9];
            break;
        case 'A9':
            retval = [1.5,2.0];
            break;
        case 'A10':
            retval = [1.0,1.5];
            break;
        case 'LETTER':
            retval = [8.5,11];
            break;
        case 'LEGAL':
            retval = [8.5,14];
            break;
        default:
            retval = [8.5,11];
            break;
    }
    
    
    if (orientation && (orientation === 'landscape')) {
        let save = retval[0];
        retval[0] = retval[1];
        retval[1] = save;
    }
    return retval;
}

export function isNumeric(type) {
    let dbtype = getFieldType(type);
    return ((dbtype === 'float') || (dbtype === 'number'));
}

export function precision(type) {
    let retval = 0;
    
    if (isNumeric(type)) {
        let pos = type.indexOf(',');
        
        if (pos > -1) {
            let pos2 = type.indexOf(')');
            
            if (pos2 > pos) {
                retval = Number(type.substring(pos+1, pos2));
            }
        }
    }
    
    return retval;
}

export function isString(type) {
    return (getFieldType(type) === 'string');
}

export function isDate(type) {
    return (getFieldType(type) === 'date');
}


export function getReportColumn(key) {
    let retval;

    for (let i = 0; i < document.designData.currentReport.reportColumns.length; ++i) {
        if (key === document.designData.currentReport.reportColumns[i].key) {
            retval = document.designData.currentReport.reportColumns[i];
            break;
        }
    }

    return retval;

}

export function setDefaultReportObjectSize(designPanel, reportObject) {
    switch (reportObject.objectType) {
        case 'dbdata':
            let colcnt = 0;
            
            for (let i = 0; i < reportObject.reportColumns.length; ++i) {
                if (reportObject.reportColumns[i].displayResult) {
                    colcnt++;
                }
            }
            
            reportObject.rect = {top: 20, left: 20, height: 200, width: 300};
            let colwidth = config.defaultColumnWidth;
            
            for (let i = 0; i < reportObject.reportColumns.length; ++i) {
                if (reportObject.reportColumns[i].displayResult) {
                    reportObject.reportColumns[i].width = colwidth;
                }
            }
            break;
        case 'label':
            reportObject.rect = getTextRect(reportObject.fontSettings.font, reportObject.fontSettings.fontSize, reportObject.labelText);
            break;
        case 'shape':
            if (reportObject.shape === 'horizontal line') {
                reportObject.rect = {left: 20, top: 20, width: 50, height: 8};
            } else if (reportObject.shape === 'vertical line') {
                reportObject.rect = {left: 20, top: 20, width: 8, height: 50};
            }
            break;
    }
}


export function isPointInRect(x, y, rc) {
    return ((x > rc.left && (x < (rc.left + rc.width))
        && (y > rc.top) && ( y < (rc.top + rc.height))));
}

export function copyObject(input) {
    if (input) {
        return JSON.parse(JSON.stringify(input));
    }
}

export function loadDefaultDocumentSettings() {
    let pixelsPerInch = getPixelsPerInch();
    let myPreferences = JSON.parse(localStorage.getItem('preferences'));
    
    if (!myPreferences || !myPreferences.documentSize) {
        myPreferences = defaults;
    } else {
        for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
            if (!myPreferences[config.defaultPreferenceNames[i]]) {
                myPreferences[config.defaultPreferenceNames[i]] = defaults[config.defaultPreferenceNames[i]];
            }
        }
    }
    
    let dim = getDocumentDimensions(myPreferences.documentSize);
    document.designData.currentReport = {};
    document.designData.currentReport.documentWidth = (pixelsPerInch * dim[0]);
    document.designData.currentReport.documentHeight = (pixelsPerInch * dim[1]);
    document.designData.currentReport.margins = [pixelsPerInch * myPreferences.marginLeft,
        pixelsPerInch * myPreferences.marginTop,
        pixelsPerInch * myPreferences.marginRight, pixelsPerInch * myPreferences.marginBottom];
    document.designData.currentReport.footerHeight = pixelsPerInch;
    document.designData.currentReport.headerHeight = pixelsPerInch;
    document.designData.currentReport.font = myPreferences.font;
    document.designData.currentReport.fontSize = myPreferences.fontSize;
    document.designData.currentReport.fontFamily = myPreferences.fontFamily;
    document.designData.currentReport.reportName = myPreferences.reportName;
}

export function formatDate(dt, format) {
    let dstr = dt.toISOString();
    let day = dstr.substring(8, 10);
    let mon = dstr.substring(5, 7);
    let year = dstr.substring(0, 4);
    let mname;
    if (format.includes('MMM')) {
        mname = config.monthNames[dt.getMonth()];
    }
    
    let retval = format.replace('dd', day).replace('yyyy', year);
    
    if (mname) {
        if (format.includes(' MMM ')) {
            retval = retval.replace('MMM', mname.substring(0, 3));
        } else {
            retval = retval.replace('MMMMMMMMM', mname);
        }
    } else {
        retval = retval.replace('mm', mon);
    }
    
    return retval;
}

export function getOrmUrl(inurl) {
    let retval = inurl;
    // in demo mode will assume everything is running in 1 docker server
    if (config.demoMode) {
        let winurl = window.location.href;
        let pos1 = winurl.indexOf('//');
        if (pos1 > -1) {
            let pos2 = winurl.indexOf('/', pos1+2);
            
            if (pos2 > pos1) {
                let server = winurl.substring(pos1+2, pos2);
                let pos2 = server.indexOf(':');
                if (pos2 > 0) {
                    server = server.substring(0, pos2);
                }
                retval = inurl.replace('localhost', server);
            }
        }
    }
    return retval;
}


export function allowMultipleChartDataAxis(chartType) {
    return ((chartType !== 'pie') && (chartType !== 'doughnut') && (chartType !== 'polar'));
}

export function formatSelectColumnForDisplay(selcol) {
    let retval;
    if (selcol.function) {
        retval = selcol.function + '(' + selcol.path.replace(/\./g, '->') + ')';
    } else {
        retval = selcol.path.replace(/\./g, '->');
    }
    
    if (selcol.customInput) {
        retval = selcol.customInput.replace('?', retval);
    }
    
    return retval;
}