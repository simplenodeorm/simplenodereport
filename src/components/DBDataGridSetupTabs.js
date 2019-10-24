/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {DBColumnSelectPanel} from './DBColumnSelectPanel';
import {DBDataGridDisplayFontPanel} from './DBDataGridDisplayFontPanel';
import {DBDataGridDisplayBorderPanel} from './DBDataGridDisplayBorderPanel';
import {ReportSectionSelect} from './ReportSectionSelect';
import config from '../config/appconfig.json';
import "../app/App.css";

const loop = (formats, curval) => {
    return formats.map((format) => {
        if (format.key === curval) {
            return <option value={format.key} selected>{format.display}</option>;
        } else {
            return <option value={format.key}>{format.display}</option>;
        }
    });
};
class DBDataGridSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onDisplayAll = this.onDisplayAll.bind(this);
        this.onClearAll = this.onClearAll.bind(this);
        this.onAsGrid = this.onAsGrid.bind(this);
        this.onDisplayFormat = this.onDisplayFormat.bind(this);
        if (!this.props.reportObject.displayFormat) {
            this.props.reportObject.displayFormat = config.defaultDbObjectDisplayFormat;
        }
    }

    render() {
        return <div className="tabSetContainer">
                <table>
                    <ReportSectionSelect reportObject={this.props.reportObject} />
                    <button className="button" onClick={this.onDisplayAll}>{config.textmsg.displayall}</button>
                    <button className="button" onClick={this.onClearAll}>{config.textmsg.clearall}</button>
                    <br />&nbsp;{config.textmsg.dbobjectdisplayformat}
                    <select onChange={this.onDisplayFormat}>{loop(config.dbObjectDisplayFormats, this.props.reportObject.displayFormat)}</select>
                    
                </table>
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.selectdata}</Tab>
                        <Tab>{config.textmsg.font}</Tab>
                        <Tab>{config.textmsg.border}</Tab>
                    </TabList>
                    <TabPanel>
                        <DBColumnSelectPanel
                            reportObject={this.props.reportObject}
                            ref={(colsel) => {this.columnSelectPanel = colsel}}/>
                    </TabPanel>
                    <TabPanel>
                        <DBDataGridDisplayFontPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    <TabPanel>
                        <DBDataGridDisplayBorderPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
    onAsGrid(asGrid) {
        this.props.reportObject.asGrid = asGrid;
    }

    onDisplayFormat(info) {
        this.props.reportObject.displayFormat = info.target.options[info.target.selectedIndex].value;
    }

    onDisplayAll() {
        for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns[i].displayResult = true;
        }
        this.columnSelectPanel.setState({updateLines: true});
    }

    onClearAll() {
        for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns[i].displayResult = false;
            this.props.reportObject.reportColumns[i].displayTotal = false;
        }

        this.columnSelectPanel.setState({dataLoaded: true});
    }
}

export {DBDataGridSetupTabs};