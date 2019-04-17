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
        this.setPointBackgroundColor = this.setPointBackgroundColor.bind(this);
        this.setPointBorderWidth = this.setPointBorderWidth.bind(this);
        this.setPointBorderColor = this.setPointBorderColor.bind(this);
        this.setRectBackgroundColor = this.setRectBackgroundColor.bind(this);
        this.setRectBorderWidth = this.setRectBorderWidth.bind(this);
        this.setRectBorderColor = this.setRectBorderColor.bind(this);
        this.setPieBackgroundColor = this.setPieBackgroundColor.bind(this);
        this.setPieBorderWidth = this.setPieBorderWidth.bind(this);
        this.setPieBorderColor = this.setPieBorderColor.bind(this);
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
                            setColor={this.setPointBackgroundColor}
                            currentColor={this.props.reportObject.pointBackgroundColor}/></td></tr>
                    <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                        <SizeSelect sizes={config.borderWidths}
                            setSize={this.setPointBorderWidth}
                            currentSize={this.props.reportObject.pointBorderWidth}/></td></tr>
                    
                    <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                            setColor={this.setPointBorderColor}
                            currentColor={this.props.reportObject.pointBorderColor}/></td></tr>
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
                                     setColor={this.setRectBackgroundColor}
                                     currentColor={this.props.reportObject.rectBackgroundColor}/></td></tr>
                    <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                        <SizeSelect sizes={config.borderWidths}
                                    setSize={this.setRectBorderWidth}
                                    currentSize={this.props.reportObject.rectBorderWidth}/></td></tr>
                
                    <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                        <ColorSelect colors={config.colors}
                                     setColor={this.setRectBorderColor}
                                     currentColor={this.props.reportObject.rectBorderColor}/></td></tr>
                </table>;
           
    
    }
    
    getPieContent() {
        return <table>
            <tr><th colSpan={2}>{config.textmsg.arc}</th></tr>
            <tr><td>{config.textmsg.backgroundcolorlabel}</td><td>
                <ColorSelect colors={config.colors}
                             setColor={this.setPieBackgroundColor}
                             currentColor={this.props.reportObject.pieBackgroundColor}/></td></tr>
            <tr><td>{config.textmsg.borderwidthlabel}</td><td>
                <SizeSelect sizes={config.borderWidths}
                            setSize={this.setPieBorderWidth}
                            currentSize={this.props.reportObject.pieBorderWidth}/></td></tr>
        
            <tr><td>{config.textmsg.bordercolorlabel}</td><td>
                <ColorSelect colors={config.colors}
                             setColor={this.setPieBorderColor}
                             currentColor={this.props.reportObject.pieBorderColor}/></td></tr>
        </table>;
    
    
    }
    
    setPointRadius(e) {
        this.props.reportObject.pointRadius = e.value;
    }
    
    setPointBackgroundColor(color) {
        this.props.reportObject.pointBackgroundColor = color;
    }
    
    setPointBorderWidth(e) {
        this.props.reportObject.pointBorderWidth = e.value;
    }
    
    setPointBorderColor(color) {
        this.props.reportObject.pointBorderColor = color;
    }
    
    setRectBackgroundColor(color) {
        this.props.reportObject.rectBackgroundColor = color;
    }
    
    setRectBorderWidth(e) {
        this.props.reportObject.rectBorderWidth = e.value;
    }
    
    setRectBorderColor(color) {
        this.props.reportObject.rectBorderColor = color;
    }
    
    setPieBackgroundColor(color) {
        this.props.reportObject.pieBackgroundColor = color;
    }
    
    setPieBorderWidth(e) {
        this.props.reportObject.pieBorderWidth = e.value;
    }
    
    setPieBorderColor(color) {
        this.props.reportObject.pieBorderColor = color;
    }


    setLineColor(color) {
        this.props.reportObject.lineColor = color;
    }
    
    setLineWidth(e) {
        this.props.reportObject.lineWidth = e.value;
    }
}

export {ChartElementsPanel};