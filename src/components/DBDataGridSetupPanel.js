/*
 * Copyright (c) 2019 simplenodeorm.org
 */

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
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: 900
            };
        }

        if (!this.props.reportObject.dataFontSettings) {
            this.props.reportObject.dataFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
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
        let retval = false;

        for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
            if (this.props.reportObject.reportColumns[i].displayResult) {
                retval = true;
                break;
            }
        }

        return retval;
    }
    
    getError() { 
        this.state.error = false;
        return 'Please select at list one display column';
    }
}

export {DBDataGridSetupPanel};