import React from 'react';
import '../app/RunReport.css';
import config from '../config/runreportconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from "axios";
import {getModalContainer,clearModalContainer,getOrmUrl} from "./helpers";
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
        this.showReport = this.showReport.bind(this);
        this.run = this.run.bind(this);
        
        if (!this.props.data) {
            this.run();
        }
    }
    
    clearStyle() {
        let styles = document.getElementsByTagName("style");
        for (let i = 0; i < styles.length; ++i) {
            styles[i].parentNode.removeChild(styles[i]);
        }
    }

    render() {
        if (this.props.data) {
            return <div id="reportContainer">
                {setTimeout(this.showReport, 500)}
            </div>;
        } else {
            return <div id="reportContainer">
                {this.getRunReportContent()}
            </div>;
        }
    }
    
    getRunReportContent() {
        const {cancelled, error, inputRequired, content} = this.state;
        let docname = document.reportId.substring(document.reportId.lastIndexOf('.') + 1);
    
        if (cancelled) {
            return <div><h1 className="loginTitle">{config.textmsg.reportrunner}</h1><div className="reportruncancel">{config.textmsg.reportcancelled}</div></div>;
        } else if (error) {
            return <div><h1 className="loginTitle">{config.textmsg.reportrunner}</h1><div className="reportrunerror">{error}</div></div>;
        } else if (!inputRequired && !content) {
            return <div><h1 className="loginTitle">{config.textmsg.reportrunner}</h1><div className="reportruninfo">
                <img alt="" src="/images/spinner.gif"/>
                &nbsp;&nbsp;{config.textmsg.runningreport.replace('<1>', docname)}</div></div>;
        } else if (inputRequired) {
            return this.showInputPanel(content);
        }
    }
    
    showInputPanel(content) {
        if (!content) {
            content = this.props.data;
        }
        let height = (150 + (22 * content.length));
        let rc = {left: 150, top: 100, width: 300, height: height};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ParameterInputPanel
            whereComparisons={content}
            onOk={this.runWithParameters}
            onCancel={this.cancelReport}/>, mc);

        return <div><h1 className="loginTitle">{config.textmsg.reportrunner}</h1></div>
    }
    
    runWithParameters(results) {
        clearModalContainer();
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
    
        const docid = document.reportId.substring(document.reportId.indexOf('.') + 1);
        axios.post(getOrmUrl(orm.url) + '/report/run/' + docid, {"parameters": results.parameters}, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.showReport(response.data);
                } else {
                    curcomp.setState({error: 'Error: HTTP status ' + response.status})
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString()});
            });
    
    }
    
    showReport(data) {
        this.clearStyle();
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(data.style));
        document.head.appendChild(style);
        if (data.chartData) {
            let stag = document.createElement('script');
            stag.src = data.chartData.chartjsurl;
            document.head.appendChild(stag);
        }
        document.getElementById("reportContainer").innerHTML = data.html;
    
        if (data.chartData) {
            let chartCode = '';
    
            for (let i = 0; i < data.chartData.charts.length; ++i) {
                chartCode += 'alert("in func"); new Chart(document.getElementById("'
                    + data.chartData.charts[i].canvasId
                    + '").getContext("2d"),'
                    + JSON.stringify(data.chartData.charts[i])
                    + ');\n'
            }
    
            chartCode += '; window.stop()';
            new Function(chartCode)();
        }
    
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
        axios.get(getOrmUrl(orm.url) + '/report/run/' + docid, config)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.userInputRequired) {
                        // show parameter input screen
                        curcomp.setState({inputRequired: true, content: response.data.whereComparisons});
                    } else {
                        curcomp.showReport(response.data)
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