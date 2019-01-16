import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {DBColumnSelectPanel} from './DBColumnSelectPanel';
import {DBDataGridDisplayFontPanel} from './DBDataGridDisplayFontPanel';
import {DBDataGridDisplayBorderPanel} from './DBDataGridDisplayBorderPanel';
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

}

export {DBDataGridSetupTabs};