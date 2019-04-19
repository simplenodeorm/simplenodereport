import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ReportSectionSelect} from './ReportSectionSelect';
import {ChartTitleSetupPanel} from './ChartTitleSetupPanel';
import {ChartDBColumnSelectPanel} from './ChartDBColumnSelectPanel';
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
                        <Tab>{config.textmsg.titlelegend}</Tab>
                        <Tab>{config.textmsg.dataset}</Tab>
                    </TabList>
                    <TabPanel>
                        <ChartTitleSetupPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    <TabPanel>
                        <ChartDBColumnSelectPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
}

export {ChartSetupTabs};