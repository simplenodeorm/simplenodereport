import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {BorderSelectPanel} from './BorderSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridDisplayBorderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);

        if (this.props.gridObject) {
            this.gridObject = JSON.parse(JSON.stringify(this.props.gridObject));
        } else {
            this.gridObject = {
                headerBorderSettings: {
                    borderStyle: 'none',
                    borderWidth: 1,
                    borderColor: 'darkGray',
                    left: true,
                    top: true,
                    right: true,
                    bottom: true
                },
                dataBorderSettings: {
                    borderStyle: 'none',
                    borderWidth: 1,
                    borderColor: 'darkGray',
                    left: true,
                    top: true,
                    right: true,
                    bottom: true
               }
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
        return this.gridObject.headerBorderSettings;
    }

    setHeaderBorderSettings(name, value) {
        this.gridObject.headerBorderSettings[name] = value;
    }

    getDataBorderSettings() {
        return this.gridObject.dataBorderSettings;
    }

    setDataBorderSettings(name, value) {
        this.gridObject.dataBorderSettings[name] = value;
    }
}

export {DBDataGridDisplayBorderPanel};