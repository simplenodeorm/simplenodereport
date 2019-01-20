import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {DBColumnSelectPanel} from './DBColumnSelectPanel';
import {DBDataGridDisplayFontPanel} from './DBDataGridDisplayFontPanel';
import {DBDataGridDisplayBorderPanel} from './DBDataGridDisplayBorderPanel';
import {ReportSectionSelect} from './ReportSectionSelect';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="tabSetContainer">
            <ReportSectionSelect reportObject={this.props.reportObject} />
            <Tabs>
                <TabList>
                    <Tab>{config.textmsg.selectdata}</Tab>
                    <Tab>{config.textmsg.font}</Tab>
                    <Tab>{config.textmsg.border}</Tab>
                </TabList>
                <TabPanel>
                    <DBColumnSelectPanel reportObject={this.props.reportObject} ref={(colsel) => {this.columnSelectPanel = colsel}}/>
                </TabPanel>
                <TabPanel>
                    <DBDataGridDisplayFontPanel reportObject={this.props.reportObject} ref={(fp) => {this.fontPanel = fp}}/>
                </TabPanel>
                <TabPanel>
                    <DBDataGridDisplayBorderPanel reportObject={this.props.reportObject} ref={(bp) => {this.borderPanel = bp}}/>
                </TabPanel>
            </Tabs>
        </div>;
    }
}

export {DBDataGridSetupTabs};