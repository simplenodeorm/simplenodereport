import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentDocument: config.textmsg.newdocument,
            error: '',
            info: ''
        };
    }
    
    render() {
        const {error, info, currentDocument} = this.state;
        return <div className="statusBar">
            <span className="currentDocument">Document: {currentDocument}</span>
            {error && <span className="errorMessage">{error}</span>}
            {info && <span className="infoMessage">{info}</span>}
            </div>;
    }
}

export {StatusBar};