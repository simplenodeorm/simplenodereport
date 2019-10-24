/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {getWaitMessage} from './helpers';
import {removeWaitMessage} from './helpers';

class BaseDesignComponent extends React.Component {

    isModalClick(e) { 
        let retval = false;
        while (e) {
            if (e.id && (e.id === 'modalcontainer')) {
                retval = true;
                break;
            }
            
            e = e.parentNode;
        }
        
        return retval;
    }
    
    showWaitMessage(msg) {
        removeWaitMessage();
        ReactDOM.render(<div className="waitMessage">
            <img alt="" src="/images/spinner.gif"/><span>{msg}</span></div>, getWaitMessage());
    }

    getReportDocument(params) {
        document.designData.currentReport.reportName = params.reportName.replace(/ /g, '_');

        return {
            authenticator: params.authenticator,
            group: params.group,
            document: document.designData.currentReport
        };
    }

}

export {BaseDesignComponent};

