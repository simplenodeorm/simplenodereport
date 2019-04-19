import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ReportSectionSelect} from './ReportSectionSelect';
import {ChartTitleSetupPanel} from './ChartTitleSetupPanel';
import {ChartElementsPanel} from './ChartElementsPanel';
import {ChartDBColumnSelectPanel} from './ChartDBColumnSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class ChartSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let elementsTabRequired = (this.props.reportObject.chartType === 'line');
        return <div className="tabSetContainer">
                <ReportSectionSelect reportObject={this.props.reportObject} />
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.titlelegend}</Tab>
                        {elementsTabRequired && <Tab>{config.textmsg.elements}</Tab>}
                        <Tab>{config.textmsg.dataset}</Tab>
                    </TabList>
                    <TabPanel>
                        <ChartTitleSetupPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    {elementsTabRequired &&
                    <TabPanel>
                        <ChartElementsPanel reportObject={this.props.reportObject}/>
                    </TabPanel>}
                    <TabPanel>
                        <ChartDBColumnSelectPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
}

export {ChartSetupTabs};