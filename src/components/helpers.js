document.designData = {
    models: '',
    modelHierarchy: '',
    selectedObjectKeys: '',
    selnodes: '',
    whereComparisons: '',
    queryResults: '',
    currentDocument: ''
};

var popupMenuClick = function(e) { 
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; 
    let y = e.clientY - rect.top; 
    if ((x < 0) || (y < 0) || (x >= rect.right) || (y >= rect.top)) {
        clearContextMenu();
    }
};

export function clearDocumentDesignData() {
    document.designData = {
        models: '',
        modelHierarchy: '',
        selectedObjectKeys: '',
        selnodes: '',
        whereComparisons: '',
        queryResults: '',
        currentDocument: ''
    };
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
    retval.style.top = info.event.pageY + 'px';
    retval.style.left = info.event.pageX + 'px';
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
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
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
            if (document.selection) { // IE
                var range = document.body.createTextRange();
                range.moveToElementText(e);
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(e);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }

            document.execCommand('copy');
            clearSelectedText();

        }
    } 
        
     catch (err) {};    
}
