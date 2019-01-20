import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import {DBDataGridSetupTabs} from './DBDataGridSetupTabs';
import "../app/App.css";

class DBDataGridSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);

    }

    getContent() {
        return <DBDataGridSetupTabs
            reportObject={this.props.reportObject}
            ref={(tabs) => {this.tabs = tabs}}/>
    }

    getResult() {
        return this.props.reportObject;
    };

    getTitle() {
        return config.textmsg.dbdatagridsetuptitle;
    }
        
    isComplete() {
        return true;
    }
    
    getError() { 
        this.state.error = false;
        return 'Please select a folder and complete all required entries';
    }
}

export {DBDataGridSetupPanel};