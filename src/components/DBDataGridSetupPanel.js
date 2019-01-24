import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import {DBDataGridSetupTabs} from './DBDataGridSetupTabs';
import "../app/App.css";
import defaults from '../config/defaults.json';

class DBDataGridSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);

        if (!this.props.reportObject.headerFontSettings) {
            this.props.reportObject.headerFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: 'black',
                backgroundColor: 'white',
                fontWeight: 900
            };
        }

        if (!this.props.reportObject.dataFontSettings) {
            this.props.reportObject.dataFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: 'black',
                backgroundColor: 'white',
                fontWeight: 100
            };
        }

        if (!this.props.reportObject.headerBorderSettings) {
            this.props.reportObject.headerBorderSettings = {
                borderStyle: 'none',
                borderWidth: 1,
                borderColor: 'darkGray',
                left: true,
                top: true,
                right: true,
                bottom: true
            };
        }

        if (!this.props.reportObject.dataBorderSettings) {
            this.props.reportObject.dataBorderSettings = {
                borderStyle: 'none',
                borderWidth: 1,
                borderColor: 'darkGray',
                left: true,
                top: true,
                right: true,
                bottom: true
            };
        }

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