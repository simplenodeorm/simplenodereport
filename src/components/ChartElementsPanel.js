import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {Checkbox} from './Checkbox';
import {PointStyleSelect} from './PointStyleSelect';
import config from '../config/appconfig.json';
import "../app/App.css";
import {SizeSelect} from "./SizeSelect";

class ChartElementsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
    
        if (!this.props.reportObject.pointRadius) {
            this.props.reportObject.pointRadius = 1;
            this.props.reportObject.pointStyle = 'circle';
            this.props.reportObject.showBackground = false;
        }
    
        if (!this.props.reportObject.yAxes) {
            this.props.reportObject.yAxes = {};
            this.props.reportObject.xAxes = {};
        }
    
        this.setPointRadius = this.setPointRadius.bind(this);
        this.setShowBackground = this.setShowBackground.bind(this);
        this.setYAxesLabel = this.setYAxesLabel.bind(this);
        this.setXAxesLabel = this.setXAxesLabel.bind(this);
    }

    render() {
        return <div className="chartElements">{this.getContent()}</div>
    }
    
    getContent() {
        if (this.props.reportObject.chartType === 'line') {
            return <table>
                <tr>
                    <th colSpan={2}>{config.textmsg.point}</th>
                </tr>
                <tr>
                    <td>{config.textmsg.radiuslabel}</td>
                    <td><SizeSelect sizes={config.borderWidths}
                                    setSize={this.setPointRadius}
                                    currentSize={this.props.reportObject.pointRadius}/></td>
                </tr>
                <tr>
                    <td>{config.textmsg.stylelabel}</td>
                    <td><PointStyleSelect reportObject={this.props.reportObject}/></td>
                </tr>
                <tr>
                    <td/>
                    <td><Checkbox label={config.textmsg.showbackground}
                                  isChecked={this.props.reportObject.showBackground}
                                  handleCheckboxChange={this.setShowBackground}/></td>
                </tr>
                <tr>
                    <td>{config.textmsg.yaxeslabel}</td>
                    <td><input type={'text'} defaultValue={this.props.reportObject.yAxes.label}
                               onBlur={this.setYAxesLabel}/></td>
                </tr>
                <tr>
                    <td>{config.textmsg.xaxeslabel}</td>
                    <td><input type={'text'} defaultValue={this.props.reportObject.xAxes.label}
                               onBlur={this.setXAxesLabel}/></td>
                </tr>
            </table>;
        } else {
            return <table>
                <tr>
                    <td>{config.textmsg.yaxeslabel}</td>
                    <td><input type={'text'} defaultValue={this.props.reportObject.yAxes.label}
                               onBlur={this.setYAxesLabel}/></td>
                </tr>
                <tr>
                <td>{config.textmsg.xaxeslabel}</td><td><input type={'text'} defaultValue={this.props.reportObject.xAxes.label}
                onBlur={this.setXAxesLabel}/></td>
                </tr>
            </table>;
        }
    }
    
    setPointRadius(e) {
        this.props.reportObject.pointRadius = e.value;
    }
    
    setShowBackground(b) {
        this.props.reportObject.showBackground = b;
    }
    
    setYAxesLabel(e) {
        this.props.reportObject.yAxes.label = e.target.value;
    }
    
    setXAxesLabel(e) {
            this.props.reportObject.xAxes.label = e.target.value;
    }
}

export {ChartElementsPanel};