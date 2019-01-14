import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {DBColumnSelectPanel} from './DBColumnSelectPanel';
import {DBDataGridDisplayFormatPanel} from './DBDataGridDisplayFormatPanel';
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
                        <DBColumnSelectPanel/>
                    </TabPanel>
                    <TabPanel>
                        <DBDataGridDisplayFormatPanel/>
                    </TabPanel>
                </Tabs>
            </div>;
    }

}

export {DBDataGridSetupTabs};