import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {BorderSelectPanel} from './BorderSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridDisplayBorderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.reportObject = this.props.reportObject;

        if (!this.reportObject.headerBorderSettings) {
            this.reportObject.headerBorderSettings = {
                borderStyle: 'none',
                borderWidth: 1,
                borderColor: 'darkGray',
                left: true,
                top: true,
                right: true,
                bottom: true
            };
        }

        if (!this.reportObject.dataBorderSettings) {
            this.reportObject.dataBorderSettings = {
                borderStyle: 'none',
                borderWidth: 1,
                borderColor: 'darkGray',
                left: true,
                top: true,
                right: true,
                bottom: true
           };
        }

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
        return this.reportObject.headerBorderSettings;
    }

    setHeaderBorderSettings(name, value) {
        this.reportObject.headerBorderSettings[name] = value;
    }

    getDataBorderSettings() {
        return this.reportObject.dataBorderSettings;
    }

    setDataBorderSettings(name, value) {
        this.reportObject.dataBorderSettings[name] = value;
    }
}

export {DBDataGridDisplayBorderPanel};