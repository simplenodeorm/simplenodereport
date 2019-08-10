import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ColumnSelectLine} from './ColumnSelectLine';
import config from '../config/appconfig';
import axios from "axios";
import "../app/App.css";
import {getUniqueKey, isNumeric,isString,isDate,removeWaitMessage} from './helpers';


class DBColumnSelectPanel extends BaseDesignComponent {
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
                return  <ColumnSelectLine
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
            let ta = 'left';
            if (document.designData.currentReport.reportColumns[i].isNumeric) {
                ta = 'right';
            }
    
    
            let displayResult = true;
            let displayTotal = false;
    
            if (this.props.reportObject.objectType === 'dbcol') {
                if (document.designData.currentReport.reportColumns[i].path !== this.props.reportObject.columnPath) {
                    displayResult = false;
                    displayTotal = false;
                }
            }
    
            this.props.reportObject.reportColumns.push({
                key: document.designData.currentReport.reportColumns[i].key,
                textAlign: ta,
                displayResult: displayResult,
                displayTotal: displayTotal,
                isString: document.designData.currentReport.reportColumns[i].isString,
                isNumeric: document.designData.currentReport.reportColumns[i].isNumeric,
                isDate: document.designData.currentReport.reportColumns[i].isDate
            });
        }
    }


    loadAvailableQueryColumns() {
        this.showWaitMessage('Loading available columns...');
        const curcomp = this;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth') }
        };

        axios.get(config.apiServerUrl + '/api/report/querycolumninfo/' + document.designData.currentReport.queryDocumentId, httpcfg)
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

export {DBColumnSelectPanel};