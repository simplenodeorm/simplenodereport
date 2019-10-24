/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {BorderSelectPanel} from './BorderSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridDisplayBorderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.getDataBorderSettings = this.getDataBorderSettings.bind(this);
        this.getHeaderBorderSettings = this.getHeaderBorderSettings.bind(this);
        this.setDataBorderSettings = this.setDataBorderSettings.bind(this);
        this.setHeaderBorderSettings = this.setHeaderBorderSettings.bind(this);
    }


    render() {
        return <div className="tabContainer">
          <BorderSelectPanel
                label={config.textmsg.headerborderlabel}
                getBorderSettings={this.getHeaderBorderSettings}
                setBorderSettings={this.setHeaderBorderSettings}/>
            <BorderSelectPanel
                label={config.textmsg.databorderlabel}
                getBorderSettings={this.getDataBorderSettings}
                setBorderSettings={this.setDataBorderSettings}/></div>
    }

   getHeaderBorderSettings() {
        return this.props.reportObject.headerBorderSettings;
    }

    setHeaderBorderSettings(name, value) {
        this.props.reportObject.headerBorderSettings[name] = value;
    }

    getDataBorderSettings() {
        return this.props.reportObject.dataBorderSettings;
    }

    setDataBorderSettings(name, value) {
        this.props.reportObject.dataBorderSettings[name] = value;
    }
}

export {DBDataGridDisplayBorderPanel};