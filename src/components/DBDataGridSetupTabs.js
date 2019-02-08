import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import {DBColumnSelectPanel} from './DBColumnSelectPanel';
import {DBDataGridDisplayFontPanel} from './DBDataGridDisplayFontPanel';
import {DBDataGridDisplayBorderPanel} from './DBDataGridDisplayBorderPanel';
import {ReportSectionSelect} from './ReportSectionSelect';
import {Checkbox} from './Checkbox';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridSetupTabs extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onDisplayAll = this.onDisplayAll.bind(this);
        this.onClearAll = this.onClearAll.bind(this);
        this.onPageBreakController = this.onPageBreakController.bind(this);
    }

    render() {
        return <div className="tabSetContainer">
                <div>
                    <ReportSectionSelect reportObject={this.props.reportObject} />
                    <button className="button" onClick={this.onDisplayAll}>{config.textmsg.displayall}</button>
                    <button className="button" onClick={this.onClearAll}>{config.textmsg.clearall}</button>
                    <Checkbox label={config.textmsg.pagebreakcontroller}
                              handleCheckboxChange={this.onPageBreakController}
                              isChecked={this.props.reportObject.pageBreakController}/>
                </div>
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
    
    onPageBreakController(pageBreaker) {
        this.props.reportObject.pageBreakController = pageBreaker;
    }

    onDisplayAll() {
        for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns[i].displayResult = true;
        }
        this.columnSelectPanel.setState({updateLines: true});
    }

    onClearAll() {
        for (let i = 0; i < this.props.reportObject.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns[i].displayResult = false;
            this.props.reportObject.reportColumns[i].displayTotal = false;
        }

        this.columnSelectPanel.setState({dataLoaded: true});
    }
}

export {DBDataGridSetupTabs};