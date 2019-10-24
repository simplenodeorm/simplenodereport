/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {FontSelectPanel} from './FontSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridDisplayFontPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);


        this.getDataFontSettings = this.getDataFontSettings.bind(this);
        this.getHeaderFontSettings = this.getHeaderFontSettings.bind(this);
        this.setDataFontSettings = this.setDataFontSettings.bind(this);
        this.setHeaderFontSettings = this.setHeaderFontSettings.bind(this);
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
                setFontSettings={this.setDataFontSettings}/></div>
    }

    getHeaderFontSettings() {
        return this.props.reportObject.headerFontSettings;
    }

    setHeaderFontSettings(name, value) {
        this.props.reportObject.headerFontSettings[name] = value;
    }

    getDataFontSettings() {
        return this.props.reportObject.dataFontSettings;
    }

    setDataFontSettings(name, value) {
        this.props.reportObject.dataFontSettings[name] = value;
    }
}

export {DBDataGridDisplayFontPanel};