import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ColumnSelectLine} from './ColumnSelectLine';
import axios from "axios";
import "../app/App.css";
import config from '../config/appconfig.json';

class DBColumnSelectPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.loadAvailableQueryColumns();
        this.state = {
            move: false
        };

        this.onMove = this.onMove.bind(this);
    }

    render() {
        let loop = (data) => {
            return data.map((node, i) => {
                return <ColumnSelectLine key={node.key} index={i} nodeCount={this.getNodeCount} onMove={this.onMove}/>;
            });};


        return (<div className="tabContainer">{loop(document.designData.availableColumns)}</div>);
    }

    onMove(index, inc) {
        let tmp = document.designData.availableColumns[index];
        if (inc < 0) {
            document.designData.availableColumns[index] = document.designData.availableColumns[index-1];
            document.designData.availableColumns[index-1] = tmp;
        } else {
            document.designData.availableColumns[index] = document.designData.availableColumns[index+1];
            document.designData.availableColumns[index+1] = tmp;
        }

        this.setState({move: true});
    }

    getNodeCount() {
        return document.designData.availableColumns.length;
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