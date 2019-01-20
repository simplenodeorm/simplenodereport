import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ColumnSelectLine} from './ColumnSelectLine';
import axios from "axios";
import "../app/App.css";
import {getUniqueKey, isNumeric} from './helpers';

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
        this.onMove = this.onMove.bind(this);
        this.getNodeCount = this.getNodeCount.bind(this);
    }

    render() {
        const {dataLoaded} = this.state;

        if (dataLoaded) {
            let loop = (data) => {
                return data.map((node, i) => {
                    return <ColumnSelectLine key={node.key} reportColumns={this.props.reportObject.reportColumns} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
                });};


            return <div className="tabContainer">{loop(this.props.reportObject.reportColumns)}</div>;
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
                    curcomp.props.reportObject.reportColumns = response.data;
                    for (let i = 0; i < curcomp.props.reportObject.reportColumns.length; ++i) {
                        curcomp.props.reportObject.reportColumns[i].key = getUniqueKey();
                        curcomp.props.reportObject.reportColumns[i].displayResult = true;
                        curcomp.props.reportObject.reportColumns[i].displayHeader = true;
                        curcomp.props.reportObject.reportColumns[i].displayTotal = false;

                        if (isNumeric(curcomp.props.reportObject.reportColumns[i].type)) {
                            curcomp.props.reportObject.reportColumns[i].textAlign = 'right';
                        } else {
                            curcomp.props.reportObject.reportColumns[i].textAlign = 'left';
                        }
                    }
                    curcomp.clearWaitMessage();
                    curcomp.setState({dataLoaded: true});
                } else {
                    curcomp.clearWaitMessage();
                    curcomp.props.setStatus(response.statusText, true);
                }

            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                curcomp.clearWaitMessage();
            });

    }
}

export {DBColumnSelectPanel};