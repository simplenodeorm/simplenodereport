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
        this.setReportSection = this.setReportSection.bind(this);
    }

    render() {
        return <div className="tabSetContainer">
            <ReportSectionSelect setReportSection={this.setReportSection} />
            <Tabs>
                <TabList>
                    <Tab>{config.textmsg.selectdata}</Tab>
                    <Tab>{config.textmsg.font}</Tab>
                    <Tab>{config.textmsg.border}</Tab>
                </TabList>
                <TabPanel>
                    <DBColumnSelectPanel/>
                </TabPanel>
                <TabPanel>
                    <DBDataGridDisplayFontPanel/>
                </TabPanel>
                <TabPanel>
                    <DBDataGridDisplayBorderPanel/>
                </TabPanel>
            </Tabs>
        </div>;
    }

    setReportSection(reportSection) {
        this.reportSection = reportSection;
    }
}

export {DBDataGridSetupTabs};