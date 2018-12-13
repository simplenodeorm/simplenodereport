import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

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
        return <div className="statusBar">
            <span className="currentDocument">Report: {currentReport.reportName}, Size: {currentReport.documentSize} </span>
            {error && <span className="errorMessage">{error}</span>}
            {info && <span className="infoMessage">{info}</span>}
            </div>;
    }
}

export {StatusBar};