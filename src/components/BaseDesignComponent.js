import React from 'react';
import ReactDOM from 'react-dom';
import {isUnaryOperator} from './helpers';
import {getWaitMessage} from './helpers';
import {removeWaitMessage} from './helpers';

class BaseDesignComponent extends React.Component {
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
        removeWaitMessage();
        ReactDOM.render(<div className="waitMessage"><img alt="spinner" src="/images/spinner.gif"/><span>{msg}</span></div>, getWaitMessage());
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

