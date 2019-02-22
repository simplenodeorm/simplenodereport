import React from 'react';
import '../app/RunReport.css';
import config from '../config/runreportconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from "axios";
import {getModalContainer,clearModalContainer} from "./helpers";
import ReactDOM from "react-dom";
import {ParameterInputPanel} from "./ParameterInputPanel";

class ReportContainer extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            cancelled: false,
            inputRequired: false,
            error: '',
            content: ''
        };
        
        this.cancelReport = this.cancelReport.bind(this);
        this.runWithParameters = this.runWithParameters.bind(this);
        this.showInputPanel = this.showInputPanel.bind(this);
        this.run = this.run.bind(this);
        
        this.run();
    }

    render() {
        return <div>
            <h1 className="loginTitle">{config.textmsg.reportrunner}</h1>
            {this.getRunReportContent()}
        </div>;
    }
    
    getRunReportContent() {
        const {cancelled, error, inputRequired, content} = this.state;
        let docname = document.reportId.substring(document.reportId.lastIndexOf('.') + 1);
    
        if (cancelled) {
            return <div className="reportruncancel">{config.textmsg.reportcancelled}</div>;
        } else if (error) {
            return <div className="reportrunerror">{error}</div>;
        } else if (!inputRequired && !content) {
            return <div className="reportruninfo">
                <img alt="" src="/images/spinner.gif"/>
                &nbsp;&nbsp;{config.textmsg.runningreport.replace('<1>', docname)}</div>;
        } else if (inputRequired) {
            return this.showInputPanel(content);
        }
    }
    
    showInputPanel(content) {
        let height = (150 + (22 * content.length));
        let rc = {left: 200, top: 50, width: 300, height: height};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ParameterInputPanel
        whereComparisons={content}
        onOk={this.runWithParameters}
        onCancel={this.cancelReport}/>, mc);

        return <div/>
    }
    
    runWithParameters(results) {
        clearModalContainer();
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
    
        const docid = document.reportId.substring(document.reportId.indexOf('.') + 1);
        axios.post(orm.url + '/report/run/' + docid, {"parameters": results.parameters}, config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.userInputRequired) {
                        // show parameter input screen
                        curcomp.setState({"inputRequired": true, "content": response.data.whereComparisons});
                    } else {
                        // report content
                        curcomp.setState({"inputRequired": false, "content": response.data});
                    }
                } else {
                    curcomp.setState({error: 'Error: HTTP status ' + response.status})
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString()});
            });
    
    }
    
    
    cancelReport() {
        clearModalContainer();
        this.setState({cancelled: true})
    }
    
    run() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
        
        const docid = document.reportId.substring(document.reportId.indexOf('.') + 1);
        axios.get(orm.url + '/report/run/' + docid, config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.userInputRequired) {
                        // show parameter input screen
                        curcomp.setState({inputRequired: true, content: response.data.whereComparisons});
                    } else {
                        // report content
                        curcomp.setState({inputRequired: false, content: response.data});
                    }
                } else {
                    curcomp.setState({error: 'Error: HTTP status ' + response.status})
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString()});
            });
    }
}

export { ReportContainer };