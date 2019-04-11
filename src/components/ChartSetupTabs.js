import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ReportSectionSelect} from './ReportSectionSelect';
import {ChartTypeSelect} from './ChartTypeSelect';
import config from '../config/appconfig.json';
import "../app/App.css";

class ChartSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="tabSetContainer">
                <ReportSectionSelect reportObject={this.props.reportObject} />
                <ChartTypeSelect reportObject={this.props.reportObject}/>
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.selectdata}</Tab>
                        <Tab>{config.textmsg.font}</Tab>
                        <Tab>{config.textmsg.border}</Tab>
                    </TabList>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
}

export {ChartSetupTabs};