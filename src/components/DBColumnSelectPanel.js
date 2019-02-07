import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ColumnSelectLine} from './ColumnSelectLine';
import axios from "axios";
import "../app/App.css";
import {getUniqueKey, isNumeric,removeWaitMessage} from './helpers';


class DBColumnSelectPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        if (!this.props.reportObject.reportColumns) {
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
        if (dataLoaded) {
            let loop = (data) => {
                return data.map((node, i) => {
                    return  <ColumnSelectLine
                        reportColumns={this.props.reportObject.reportColumns}
                        index={i}
                        nodeCount={this.getNodeCount}
                        onMove={this.onMove}/>;

                });};


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


    loadAvailableQueryColumns() {
        this.showWaitMessage('Loading available columns...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };

        axios.get(orm.url + '/report/querycolumninfo/' + document.designData.currentReport.queryDocumentId.replace(':','.'), config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.currentReport.reportColumns = response.data;
                    curcomp.props.reportObject.reportColumns = [];
                    for (let i = 0; i < document.designData.currentReport.reportColumns.length; ++i) {
                        document.designData.currentReport.reportColumns[i].key = getUniqueKey();
                        document.designData.currentReport.reportColumns[i].isNumeric = isNumeric(document.designData.currentReport.reportColumns[i].type);
                        let ta = 'left';
                        if (document.designData.currentReport.reportColumns[i].isNumeric) {
                            ta = 'right';
                        }

                        curcomp.props.reportObject.reportColumns.push({
                            key: document.designData.currentReport.reportColumns[i].key,
                            textAlign: ta,
                            displayResult: true,
                            displayTotal : false
                        });
                    }
    
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