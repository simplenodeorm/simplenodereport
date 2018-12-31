import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);

    }


    render() {
        return <div className="tabSetContainer">
                <Tabs>
                    <TabList>
                        <Tab>{config.textmsg.selectdata}</Tab>
                        <Tab>{config.textmsg.displayformat}</Tab>
                    </TabList>
                    <TabPanel>
                        <div>111</div>
                    </TabPanel>
                    <TabPanel>
                        <div>222</div>
                    </TabPanel>
                </Tabs>
            </div>;
    }

}

export {DBDataGridSetupTabs};