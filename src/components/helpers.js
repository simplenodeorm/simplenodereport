import config from '../config/appconfig.json';

document.designData = {
    currentReport: {}
};

var popupMenuClick = function(e) { 
    let cm = document.getElementById('ctxmenu');
    let rect = cm.getBoundingClientRect();
    let x = e.clientX; // - rect.left; 
    let y = e.clientY; // - rect.top; 
    if ((x < 0) || (y < 0) || (x >= rect.right) || (y >= rect.top)) {
        clearContextMenu();
    }
};

var ppi;

export function clearDocumentDesignData() {
    for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
        document.designData[config.defaultPreferenceNames[i]] = '';
    }
    
    document.designData.currentReport = {};
}
    
export function getFieldType(dbType) {
    let retval;
    let check = dbType.toLowerCase();
    if (check.startsWith('number')) {
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
        document.removeEventListener('click', popupMenuClick, true);
        document.body.removeChild(cm);
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
    retval.style.top = info.event.pageY + yOffset + 'px';
    retval.style.left = info.event.pageX + xOffset + 'px';
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

export function clearModalContainer(mc) {
    const mcdom = document.getElementById('modalcontainer');
    if (mcdom) {
        document.removeEventListener('click', mc.clickFunction, true);
        document.body.removeChild(mcdom);
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
    retval.style.width = '250px';
    retval.style.height = '30px';
    retval.style.border = 'none';
    retval.style.visibility = 'visible';
    return retval;
}

export function removeWaitMessage() {
    let e = document.getElementById('waitmsg');
    if (e) {
        document.removeEventListener('click', e.waitMessageClick, true);
        document.body.removeChild(e);
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

export function getFontHeight(fontName, fontSize, width, text) {
    if (!width) {
        width = '100';
    }

    let fontStyle = '{font-family: ' + fontName + '; font-size: ' + fontSize
        + 'pt; width: '+ Math.floor(width) + 'px; left: -100px; top: -100px}';
    let body = document.getElementsByTagName('body')[0];
    let testElement = document.createElement('div');
    testElement.setAttribute('id', 'font-test');
    testElement.setAttribute('style', fontStyle);

    if (text) {
        testElement.innerHTML = text;
    } else {
        testElement.innerHTML = 'XXXXX'
    }

    body.appendChild(testElement);
    let retval = document.getElementById('font-test').getBoundingClientRect().height;
    body.removeChild(testElement);

    return Math.ceil(retval/config.zoomFactor);
}


export function getDocumentDimensions(type) {
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
    
    return retval;
}

export function isNumeric(type) {
    let dbtype = getFieldType(type);
    return ((dbtype === 'float') || (dbtype === 'number'));
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