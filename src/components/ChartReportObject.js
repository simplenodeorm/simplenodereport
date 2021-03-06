/*
 * Copyright (c) 2019 simplenodeorm.org
 */

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
import { Radar } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import tinycolor from 'tinycolor2'


class ChartReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName()
        };
    }
    
    getContent(objectData) {
        switch(this.props.config.chartType) {
            case 'bar':
                return <Bar data={this.getData()} options={this.getOptions()}/>;
            case 'horizontalBar':
                return <HorizontalBar data={this.getData()} options={this.getOptions()}/>;
            case 'line':
                return <Line data={this.getData()} options={this.getOptions()}/>;
            case 'pie':
                return <Pie data={this.getData()} options={this.getOptions()}/>;
            case 'doughnut':
                return <Doughnut data={this.getData()} options={this.getOptions()}/>;
            case 'radar':
                return <Radar data={this.getData()} options={this.getOptions()}/>;
            case 'polarArea':
                return <Polar fillOpacity={0.3} data={this.getData()} options={this.getOptions()}/>;
            case 'scatter':
                return <Scatter data={this.getData()} options={this.getOptions()}/>;
        }
   }
   
   getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        this.addBaseReportObjectCss(style, objectData.cssClassName, this.props.config.textAlign);
        return style;
    }
    
    getDefaultRect() {
        return {top: 20, left: 20, height: 200, width: 300};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 500, height: 425};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ChartSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
    }
    
    getData() {
        let ds = this.getDatasets();
        return {
            title: this.props.config.title,
            fillOpacity: 0.3,
            labels: ['catvalue1', 'catvalue2', 'catvalue3', 'catvalue4', 'catvalue5'],
            datasets: ds
        };
    }
    
    getDatasets() {
        let retval = [];
    
        let dataAxes = this.getDataAxisDefs();
        for (let i = 0; i < dataAxes.length; ++i) {
            let ds = {};
            ds.id = ('ds' + i);
            if (dataAxes[i].label) {
                ds.label = dataAxes[i].label;
            } else {
                ds.label = ('label' + (i+1));
            }
            
            if (dataAxes[i].color) {
                switch(this.props.config.chartType) {
                    case 'bar':
                    case 'horizontalBar':
                        ds.backgroundColor = dataAxes[i].color;
                        ds.borderColor = dataAxes[i].color;
                        ds.borderWidth = 1;
                        ds.hoverBackgroundColor = tinycolor(ds.backgroundColor).darken(15).toString();
                        break;
                    case 'line':
                    case 'radar':
                    case 'scatter':
                        ds.borderColor = dataAxes[i].color;
                        ds.borderWidth = dataAxes[i].borderWidth;
                        if (this.props.config.showBackground) {
                            ds.backgroundColor = tinycolor(ds.borderColor).lighten(40).desaturate(20).setAlpha(0.3).toString();
                            ds.hoverBackgroundColor = tinycolor(ds.borderColor).darken(20).toString();
                        } else {
                            ds.backgroundColor = 'transparent';
                            ds.hoverBackgroundColor = 'transparent';
                        }
                        ds.pointStyle = this.props.config.pointStyle;
                        ds.pointRadius = this.props.config.pointRadius;
                        break;
                }
            }
            ds.data = [];
    
            if (this.props.config.chartType === 'scatter') {
                for (let i = 0; i < 20; ++i) {
                    ds.data.push({x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)});
                }
                
            } else {
                for (let i = 0; i < 5; i++) {
                    ds.data.push(Math.floor(Math.random() * 100));
        
                    switch (this.props.config.chartType) {
                        case 'pie':
                        case 'doughnut':
                        case 'polarArea':
                            if (!ds.backgroundColor) {
                                ds.backgroundColor = [];
                            }
    
                            if (this.props.config.chartType === 'polarArea') {
                                ds.backgroundColor.push(randomColor({luminosity: 'dark', alpha: 0.3, format: 'rgba'}));
                            } else {
                                ds.backgroundColor.push(randomColor({luminosity: 'dark'}));
                            }
                            break;
            
                    }
                }
            }
            
            retval.push(ds);
        }
        
    
        return retval;
    }
    
    getOptions() {
        let tstyle = 'normal';
        
        if (this.props.config.titleFontSettings.italic) {
            tstyle = 'italic';
        }
        
        let lstyle = 'normal';
    
        if (this.props.config.legendFontSettings.italic) {
            lstyle = 'italic';
        }
        
        let retval = {
            responsive: this.props.config.responsive,
            maintainAspectRatio: this.props.config.maintainAspect,
             title: {
                display: this.props.config.titleFontSettings.display,
                position: this.props.config.titleFontSettings.position,
                fontSize: this.props.config.titleFontSettings.fontSize,
                fontColor: this.props.config.titleFontSettings.fontColor,
                fontFamily: this.props.config.titleFontSettings.font,
                fontStyle: tstyle,
                text: this.props.config.title
            },
            legend: {
               display: this.props.config.legendFontSettings.display,
               position: this.props.config.legendFontSettings.position,
               labels: {
                   boxWidth: 10,
                   boxHeight: 2,
                   fontColor: this.props.config.legendFontSettings.fontColor,
                   fontSize: this.props.config.legendFontSettings.fontSize,
                   fontFamily: this.props.config.legendFontSettings.font,
                   fontStyle: lstyle
                }
             }
        };
    
        if (this.props.config.yAxes || this.props.config.xAxes) {
            retval.scales = {};
            if (this.props.config.yAxes && this.props.config.yAxes.label) {
                retval.scales.yAxes = [];
                retval.scales.yAxes.push({scaleLabel: {display: true, labelString: this.props.config.yAxes.label}});
            }
        
            if (this.props.config.xAxes && this.props.config.xAxes.label) {
                retval.scales.xAxes = [];
                retval.scales.xAxes.push({scaleLabel: {display: true, labelString: this.props.config.xAxes.label}});
            }
        }
    
        return retval;
    }
    
    getDataAxisDefs() {
        let retval = [];
        
        for (let i = 0; i < this.props.config.reportColumns.length; ++i) {
            if (this.props.config.reportColumns[i].axis === 'data') {
                retval.push(this.props.config.reportColumns[i]);
            }
        }
        
        return retval;
    }
}

export {ChartReportObject};

