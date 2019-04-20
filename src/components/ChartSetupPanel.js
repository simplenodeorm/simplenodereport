import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import {ChartSetupTabs} from './ChartSetupTabs';
import "../app/App.css";

class ChartSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
    }

    getContent() {
        return <ChartSetupTabs
            reportObject={this.props.reportObject}
            ref={(tabs) => {this.tabs = tabs}}/>
    }

    getResult() {
        return this.props.reportObject;
    };

    getTitle() {
        return config.textmsg.chartsetuptitle + '[' + this.props.reportObject.chartType + ']';
    }
        
    isComplete() {
        let retval = false;

        if (this.props.reportObject.reportColumns) {
            for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
                if (this.props.reportObject.reportColumns[i].axis
                    && (this.props.reportObject.reportColumns[i].axis === 'data')) {
                    retval = true;
                    break;
                }
            }
        }
        

        return retval;
    }
    
    getError() { 
        this.state.error = false;
        return 'Please select category and at last one data column';
    }
}

export {ChartSetupPanel};