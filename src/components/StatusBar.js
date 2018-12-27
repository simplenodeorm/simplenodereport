import React from 'react';
import "../app/App.css";
import {getDocumentDimensions} from './helpers.js';

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentReport: document.designData.currentReport,
            error: '',
            info: ''
        };
    }
    
    render() {
        const {error, info, currentReport} = this.state;
        let sz = ' ';
        if (currentReport && currentReport.documentSize) {
            let dim = getDocumentDimensions(currentReport.documentSize);
            sz = ' [' + dim[0] + ',' + dim[1] + ']in';
        }
        
        return <div className="statusBar">
            <span className="currentDocument">Report: {currentReport.reportName}, Size: {currentReport.documentSize}{sz}</span>
            {error && <span className="errorMessage">{error}</span>}
            {info && <span className="infoMessage">{info}</span>}
            </div>;
    }
}

export {StatusBar};