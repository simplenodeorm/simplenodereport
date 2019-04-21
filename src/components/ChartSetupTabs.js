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
        this.showElementsTab = this.showElementsTab.bind(this);
    }

    render() {
         return <div className="tabSetContainer">
                <ReportSectionSelect reportObject={this.props.reportObject} />
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.titlelegend}</Tab>
                        {this.showElementsTab()  && <Tab>{config.textmsg.elements}</Tab>}
                        <Tab>{config.textmsg.dataset}</Tab>
                    </TabList>
                    <TabPanel>
                        <ChartTitleSetupPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                    {this.showElementsTab() &&
                    <TabPanel>
                        <ChartElementsPanel reportObject={this.props.reportObject}/>
                    </TabPanel>}
                    <TabPanel>
                        <ChartDBColumnSelectPanel reportObject={this.props.reportObject}/>
                    </TabPanel>
                </Tabs>
            </div>;
    }
    
    showElementsTab() {
        switch(this.props.reportObject.chartType) {
            case 'line':
            case 'bar':
                return true;
            default:
                return false;
        }

    }
}

export {ChartSetupTabs};