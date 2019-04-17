import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ChartColumnSelectLine} from './ChartColumnSelectLine';
import axios from "axios";
import "../app/App.css";
import {getUniqueKey, isNumeric,isString,isDate,removeWaitMessage,getOrmUrl} from './helpers';


class ChartDBColumnSelectPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        if (!document.designData.currentReport.reportColumns) {
            this.loadAvailableQueryColumns();
            this.state = {
                move: false,
                dataLoaded: false
            };
        } else {
            this.state = {
                move: false,
                dataLoaded: true
            };
        }

        this.columnSelects = [];

        this.onMove = this.onMove.bind(this);
        this.getNodeCount = this.getNodeCount.bind(this);
    }

    render() {
        const {dataLoaded} = this.state;
        const loop = (data) => {
            return data.map((node, i) => {
                return  <ChartColumnSelectLine
                    reportColumns={this.props.reportObject.reportColumns}
                    index={i}
                    nodeCount={this.getNodeCount}
                    onMove={this.onMove}/>;
            
            });
        };
    
        if (dataLoaded) {
            if (!this.props.reportObject.reportColumns || (this.props.reportObject.reportColumns.length ===0)) {
                this.populateReportObjectData();
            }
            return <div style={{height: "75%"}} className="tabContainer">{loop(this.props.reportObject.reportColumns, this.columnSelects)}</div>;
        } else {
            return <div className="tabContainer"/>;
        }
    }

    onMove(index, inc) {
        let tmp = this.props.reportObject.reportColumns[index];
        if (inc < 0) {
            this.props.reportObject.reportColumns[index] = this.props.reportObject.reportColumns[index-1];
            this.props.reportObject.reportColumns[index-1] = tmp;
        } else {
            this.props.reportObject.reportColumns[index] = this.props.reportObject.reportColumns[index+1];
            this.props.reportObject.reportColumns[index+1] = tmp;
        }

        this.setState({move: true});
    }

    getNodeCount() {
        return this.props.reportObject.reportColumns.length;
    }
    
    populateReportObjectData() {
        this.props.reportObject.reportColumns = [];
        for (let i = 0; i < document.designData.currentReport.reportColumns.length; ++i) {
            this.props.reportObject.reportColumns.push({
                key: document.designData.currentReport.reportColumns[i].key,
                function: document.designData.currentReport.reportColumns[i].function,
                isString: document.designData.currentReport.reportColumns[i].isString,
                isNumeric: document.designData.currentReport.reportColumns[i].isNumeric,
                isDate: document.designData.currentReport.reportColumns[i].isDate
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
}

export {ChartDBColumnSelectPanel};