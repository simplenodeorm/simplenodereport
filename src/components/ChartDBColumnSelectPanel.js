import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ChartCategorySelect} from './ChartCategorySelect';
import {ChartDataSelect} from './ChartDataSelect';
import axios from "axios";
import "../app/App.css";
import {getUniqueKey, isNumeric,isString,isDate,removeWaitMessage,getOrmUrl,precision} from './helpers';


class ChartDBColumnSelectPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        if (!document.designData.currentReport.reportColumns) {
            this.loadAvailableQueryColumns();
            this.state = {
                dataLoaded: false
            };
        } else {
            this.state = {
                dataLoaded: true
            };
        }
        
        this.categoryChanged = this.categoryChanged.bind(this);
    }

    render() {
        const {dataLoaded} = this.state;
        if (dataLoaded) {
            if (!this.props.reportObject.reportColumns
                || (this.props.reportObject.reportColumns.length === 0)) {
                this.populateReportObjectData();
            }
            return <div>
                    <ChartCategorySelect categoryChanged={this.categoryChanged}
                        reportColumns={this.props.reportObject.reportColumns} />
                    <hr />
                    <ChartDataSelect ref={(ds) => {this.dataSelect = ds}}
                         chartType={this.props.reportObject.chartType}
                         reportColumns={this.props.reportObject.reportColumns} /></div>
        } else {
            return <div className="tabContainer"/>;
        }
    }

    populateReportObjectData() {
        this.props.reportObject.reportColumns = [];
        for (let i = 0; i < document.designData.currentReport.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns.push({
                key: document.designData.currentReport.reportColumns[i].key,
                path: document.designData.currentReport.reportColumns[i].path,
                function: document.designData.currentReport.reportColumns[i].function,
                customInput: document.designData.currentReport.reportColumns[i].customInput,
                isString: document.designData.currentReport.reportColumns[i].isString,
                isNumeric: document.designData.currentReport.reportColumns[i].isNumeric,
                isDate: document.designData.currentReport.reportColumns[i].isDate,
                precision: document.designData.currentReport.reportColumns[i].precision
            });
        }
    }


    loadAvailableQueryColumns() {
        this.showWaitMessage('Loading available columns...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };

        axios.get(getOrmUrl(orm.url) + '/report/querycolumninfo/' + document.designData.currentReport.queryDocumentId, config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.currentReport.reportColumns = response.data;
                    for (let i = 0; i < document.designData.currentReport.reportColumns.length; ++i) {
                        document.designData.currentReport.reportColumns[i].key = getUniqueKey();
                        document.designData.currentReport.reportColumns[i].isNumeric = isNumeric(document.designData.currentReport.reportColumns[i].type);
                        document.designData.currentReport.reportColumns[i].isString = isString(document.designData.currentReport.reportColumns[i].type);
                        document.designData.currentReport.reportColumns[i].isDate = isDate(document.designData.currentReport.reportColumns[i].type);
                        
                        if (document.designData.currentReport.reportColumns[i].isNumeric) {
                            document.designData.currentReport.reportColumns[i].precision = precision(document.designData.currentReport.reportColumns[i].type);
                        }
                    }
                    curcomp.populateReportObjectData();
                    removeWaitMessage();
                    curcomp.setState({dataLoaded: true});
                } else {
                    removeWaitMessage();
                    curcomp.props.setStatus(response.statusText, true);
                }

            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
            });

    }
    
    categoryChanged() {
        if (this.dataSelect) {
            this.dataSelect.setState(this.dataSelect.state);
        }
    }
}

export {ChartDBColumnSelectPanel};