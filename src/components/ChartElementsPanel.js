import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ColorSelect} from './ColorSelect';
import {PointStyleSelect} from './PointStyleSelect';
import config from '../config/appconfig.json';
import "../app/App.css";
import {SizeSelect} from "./SizeSelect";

class ChartElementsPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);

        this.getLineContent = this.getLineContent.bind(this);
        this.getBarContent = this.getBarContent.bind(this);
        this.getPieContent = this.getPieContent.bind(this);
        this.setPointRadius = this.setPointRadius.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setBorderWidth = this.setBorderWidth.bind(this);
        this.setBorderColor = this.setBorderColor.bind(this);
        this.setLineWidth = this.setLineWidth.bind(this);
        this.setLineColor = this.setLineColor.bind(this);
    }


    render() {
        return <div className="chartElements">{this.getContent()}</div>
    }
    
    getContent() {
        switch(this.props.reportObject.chartType) {
            case 'line':
                return this.getLineContent();
            case 'bar':
                return this.getBarContent();
            case 'doughnut':
            case 'pie':
                return this.getPieContent();
        }
    }
    
    getLineContent() {
        return <table><tr>
            <td>
                <table>
                    <tr><th colSpan={2}>{config.textmsg.point}</th></tr>
                    <tr><td>{config.textmsg.radiuslabel}</td><td><SizeSelect sizes={config.borderWidths}
                        setSize={this.setPointRadius}
                        currentSize={this.props.reportObject.pointRadius}/></td></tr>
                    <tr><td>{config.textmsg.stylelabel}</td><td><PointStyleSelect reportObject={this.props.reportObject}/></td></tr>
                    <tr><td>{config.textmsg.backgroundcolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                            setColor={this.setBackgroundColor}
                            currentColor={this.props.reportObject.backgroundColor}/></td></tr>
                    <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                        <SizeSelect sizes={config.borderWidths}
                            setSize={this.setBorderWidth}
                            currentSize={this.props.reportObject.borderWidth}/></td></tr>
                    
                    <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                            setColor={this.setPointBorderColor}
                            currentColor={this.props.reportObject.borderColor}/></td></tr>
                </table>
            </td>
            <td style={{borderLeft: 'solid gray 1px', verticalAlign: 'top'}}>
                <table>
                    <tr><th colSpan={2}>{config.textmsg.line}</th></tr>
                    <tr><td>{config.textmsg.linewidthlabel}</td><td><SizeSelect sizes={config.borderWidths}
                         setSize={this.setLineWidth}
                         currentSize={this.props.reportObject.lineWidth}/></td></tr>
                    <tr><td>{config.textmsg.linecolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                            setColor={this.setLineColor}
                            currentColor={this.props.reportObject.lineColor}/></td></tr>
                </table>

            </td></tr></table>;
    
    }
    
    getBarContent() {
        return <table>
                    <tr><th colSpan={2}>{config.textmsg.rectangle}</th></tr>
                    <tr><td>{config.textmsg.backgroundcolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                                     setColor={this.setBackgroundColor}
                                     currentColor={this.props.reportObject.backgroundColor}/></td></tr>
                    <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                        <SizeSelect sizes={config.borderWidths}
                                    setSize={this.setBorderWidth}
                                    currentSize={this.props.reportObject.borderWidth}/></td></tr>
                
                    <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                                     setColor={this.setBorderColor}
                                     currentColor={this.props.reportObject.borderColor}/></td></tr>
                </table>;
           
    
    }
    
    getPieContent() {
        return <table>
            <tr><th colSpan={2}>{config.textmsg.arc}</th></tr>
            <tr><td>{config.textmsg.backgroundcolorlabel}</td><td>
                <ColorSelect colors={config.colors}
                             setColor={this.setBackgroundColor}
                             currentColor={this.props.reportObject.backgroundColor}/></td></tr>
            <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                <SizeSelect sizes={config.borderWidths}
                            setSize={this.setBorderWidth}
                            currentSize={this.props.reportObject.borderWidth}/></td></tr>
        
            <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                <ColorSelect colors={config.colors}
                             setColor={this.setBorderColor}
                             currentColor={this.props.reportObject.borderColor}/></td></tr>
        </table>;
    
    
    }
    
    setPointRadius(e) {
        this.props.reportObject.pointRadius = e.value;
    }
    
    setBackgroundColor(color) {
        this.props.reportObject.pointBackgroundColor = color;
    }
    
    setBorderWidth(e) {
        this.props.reportObject.pointBorderWidth = e.value;
    }
    
    setBorderColor(color) {
        this.props.reportObject.pointBorderColor = color;
    }
    
    setLineColor(color) {
        this.props.reportObject.lineColor = color;
    }
    
    setLineWidth(e) {
        this.props.reportObject.lineWidth = e.value;
    }
}

export {ChartElementsPanel};