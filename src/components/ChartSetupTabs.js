import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ReportSectionSelect} from './ReportSectionSelect';
import {ChartLegendPanel} from './ChartLegendPanel';
import {ChartTitlePanel} from './ChartTitlePanel';
import {ChartElementsPanel} from './ChartElementsPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class ChartSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="tabSetContainer">
                <ReportSectionSelect reportObject={this.props.reportObject} />
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.legend}</Tab>
                        <Tab>{config.textmsg.title}</Tab>
                        <Tab>{config.textmsg.elements}</Tab>
                        <Tab>{config.textmsg.dataset}</Tab>
                    </TabList>
                    <TabPanel>
                        <ChartLegendPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    <TabPanel>
                        <ChartTitlePanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    <TabPanel>
                        <ChartElementsPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
}

export {ChartSetupTabs};