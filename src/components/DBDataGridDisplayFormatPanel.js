import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {FontSelectPanel} from './FontSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";
import {Checkbox} from "./Checkbox";

class DBDataGridDisplayFormatPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);

        if (this.props.gridObject) {
            this.gridObject = JSON.parse(JSON.stringify(this.props.gridObject));
        } else {
            this.gridObject = {
                headerFontSettings: {
                    font: 'Arial',
                    fontSize: 12,
                    fontWeight: 900
                },
                dataFontSettings: {
                    font: 'Arial',
                    fontSize: 12,
                    fontWeight: 100
                },
                showGrid: true,
                fillReportSection: true

            };
        }

        this.getDataFontSettings = this.getDataFontSettings.bind(this);
        this.getHeaderFontSettings = this.getHeaderFontSettings.bind(this);
        this.setDataFontSettings = this.setDataFontSettings.bind(this);
        this.setHeaderFontSettings = this.setHeaderFontSettings.bind(this);
        this.setShowGridLines = this.setShowGridLines.bind(this);
        this.setFillReportSection = this.setFillReportSection.bind(this);
    }


    render() {
        return <div className="tabContainer">
            <FontSelectPanel
                label={config.textmsg.headerfontlabel}
                getFontSettings={this.getHeaderFontSettings}
                setFontSettings={this.setHeaderFontSettings}/>
            <FontSelectPanel
                label={config.textmsg.datafontlabel}
                getFontSettings={this.getDataFontSettings}
                setFontSettings={this.setDataFontSettings}/>
            <hr />
            <Checkbox label={config.textmsg.showgridlines}
                handleCheckboxChange={this.setShowGridLines}
                isChecked={this.gridObject.showGrid}/>
            <br />
            <Checkbox label={config.textmsg.fillreportsection}
                handleCheckboxChange={this.setFillReportSection}
                      isChecked={this.gridObject.fillReportSection}/></div>
    }

    getHeaderFontSettings() {
        return this.gridObject.headerFontSettings;
    }

    setHeaderFontSettings(name, value) {
        this.gridObject.headerFontSettings[name] = value;
    }

    getDataFontSettings() {
        return this.gridObject.dataFontSettings;
    }

    setDataFontSettings(name, value) {
        this.gridObject.dataFontSettings[name] = value;
    }

    setShowGridLines(show) {
        this.gridObject.showGrid = show;
    }

    setFillReportSection(fill) {
        this.gridObject.fillReportSection = fill;
    }

}

export {DBDataGridDisplayFormatPanel};