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
        this.getLineContent = this.getLineContent.bind(this);
        this.setPointRadius = this.setPointRadius.bind(this);
        this.setShowBackground = this.setShowBackground.bind(this);
    }

    render() {
        return <div className="chartElements">{this.getContent()}</div>
    }
    
    getContent() {
        switch(this.props.reportObject.chartType) {
            case 'line':
                return this.getLineContent();
        }
    }
    
    getLineContent() {
        return <table>
                    <tr><th colSpan={2}>{config.textmsg.point}</th></tr>
                    <tr><td>{config.textmsg.radiuslabel}</td><td><SizeSelect sizes={config.borderWidths}
                        setSize={this.setPointRadius}
                        currentSize={this.props.reportObject.pointRadius}/></td></tr>
                    <tr><td>{config.textmsg.stylelabel}</td><td><PointStyleSelect reportObject={this.props.reportObject}/></td></tr>
                    <tr><td /><td><Checkbox label={config.textmsg.showbackground}
                        isChecked={this.props.reportObject.showBackground}
                        handleCheckboxChange={this.setShowBackground}/></td></tr>
        </table>
            ;
    
    }
    
    setPointRadius(e) {
        this.props.reportObject.pointRadius = e.value;
    }
    
    setShowBackground(b) {
        this.props.reportObject.showBackground = b;
    }
}

export {ChartElementsPanel};