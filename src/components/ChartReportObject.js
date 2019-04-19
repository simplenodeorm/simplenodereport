import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import {copyObject, getModalContainer} from "./helpers";
import ReactDOM from "react-dom";
import {ChartSetupPanel} from "./ChartSetupPanel";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

class ChartReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            url: this.props.config.url,
            linkText: this.props.config.linkText,
            showInNewTab: false
        };
    }
    
    getContent(objectData) {
        switch(this.props.config.chartType) {
            case 'bar':
                return <Bar data={this.getData()} legend={this.getLegend()} options={this.getOptions()}/>;
            case 'line':
                return <Line data={this.getData()} legend={this.getLegend()} options={this.getOptions()}/>;
            case 'pie':
                return <Pie data={this.getData()} legend={this.getLegend()} options={this.getOptions()}/>;
            case 'doughnut':
                return <Doughnut data={this.getData()}  legend={this.getLegend()} options={this.getOptions()}/>;
        }
   }
    
    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        this.addBaseReportObjectCss(style, objectData.cssClassName, this.props.config.textAlign);
        return style;
    }
    
    getDefaultRect() {
        return {top: 20, left: 20, height: 100, width: 100};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 500, height: 425};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ChartSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
    }
    
    getData() {
        return {
            title: "my title",
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'dataset2',
                    backgroundColor: 'blue',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [23, 65, 10, 91, 32, 44, 60]
                }
            ]
        };
    }
    
    getLegend() {
        return {
            display: true,
            position: 'top',
            fullWidth: true,
            reverse: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        };
    }
    
    
    getOptions() {
        return {
            legend: {
                display: true,
                boxWidth: 20,
                position: 'top',
                fontSize: 8,
                fontColor: 'black',
                fontFamily: 'arial',
                fontStyle: 'normal'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10
                    }
                }]
            },
            title: {
                display: true,
                position: 'top',
                fontSize: 25,
                fontColor: 'black',
                fontFamily: 'arial',
                fontStyle: 'normal',
                    text: "my title"
            }
        }
    }
}

export {ChartReportObject};

