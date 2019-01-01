import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {BaseDesignComponent} from './BaseDesignComponent';
import config from '../config/appconfig.json';
import "../app/App.css";
import axios from "axios";

class DBColumnSelectPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadAvailableQueryColumns();
        this.state = {
            move: false,
            redraw: false
        };

        this.onMove = this.onMove.bind(this);
    }

    render() {
        this.loadSelectedNodesIfRequired();

        this.state.move = false;
        this.state.redraw = false;

        let loop = (data) => {
            return data.map((node, i) => {
                return <ColumnSelectLine key={node.key} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
            });};

        return (<div className="tabContainer">{loop(document.designData.selnodes)}</div>);
    }

    onMove(index, inc) {
        let tmp = document.designData.selnodes[index];
        if (inc < 0) {
            document.designData.selnodes[index] = document.designData.selnodes[index-1];
            document.designData.selnodes[index-1] = tmp;
        } else {
            document.designData.selnodes[index] = document.designData.selnodes[index+1];
            document.designData.selnodes[index+1] = tmp;
        }

        this.setState({move: true});
    }

    getNodeCount() {
        return document.designData.selnodes.length;
    }


    loadAvailableQueryColumns() {

        this.showWaitMessage('Loading available columns...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.get(orm.url + '/report/querycolumns', document.designData.currentReport.queryDocumentId, config)
            .then((response) => {
                if (response.status === 200) {
                    document.designData.availableColumns = response;
                    curcomp.clearWaitMessage();
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