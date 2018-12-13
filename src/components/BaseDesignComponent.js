import React from 'react';
import ReactDOM from 'react-dom';
import {isUnaryOperator} from './helpers';
import {getWaitMessage} from './helpers';
import {removeWaitMessage} from './helpers';

class BaseDesignComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    inputParametersRequired() {
        let retval;

        for (let i = 0; i < document.designData.whereComparisons.length; ++i) {
            if (!document.designData.whereComparisons[i].customFilterInput
                && !isUnaryOperator(document.designData.whereComparisons[i].comparisonOperator)
                && !document.designData.whereComparisons[i].comparisonValue) {
                retval = true;
                break;
            }
        }

        return retval;
    }

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
        this.clearWaitMessage();
        ReactDOM.render(<div className="waitMessage"><img src="/images/spinner.gif"/><span>{msg}</span></div>, getWaitMessage());
    }

    clearWaitMessage() {
        removeWaitMessage();
    }
    
    getReportDocument(params) {
        return {
            authenticator: params.authenticator,
            reportName: document.designData.currentReport.reportName,
            group: params.group,
            document: document.designData.currentReport
        };
    }

}

export {BaseDesignComponent};

