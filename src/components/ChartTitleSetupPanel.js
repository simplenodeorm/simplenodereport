import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ChartFontSelectPanel} from './ChartFontSelectPanel';
import {Checkbox} from './Checkbox';
import config from '../config/appconfig.json';
import "../app/App.css";
import defaults from "../config/defaults";

class ChartTitleSetupPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
    
        if (!this.props.reportObject.legendFontSettings) {
            this.props.reportObject.legendFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                display: true,
                position: 'top'
            };
        }
    
        if (!this.props.reportObject.titleFontSettings) {
            this.props.reportObject.title = 'my title';
            this.props.reportObject.maintainAspect = true;
            this.props.reportObject.responsive = true;
            this.props.reportObject.titleFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize * 3,
                fontColor: config.defaultTextColor,
                display: true,
                position: 'top'
            };
        }
    
        this.getLegendFontSettings = this.getLegendFontSettings.bind(this);
        this.setLegendFontSettings = this.setLegendFontSettings.bind(this);
        this.getTitleFontSettings = this.getTitleFontSettings.bind(this);
        this.setTitleFontSettings = this.setTitleFontSettings.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setMaintainAspect = this.setMaintainAspect.bind(this);
        this.setResponsive = this.setResponsive.bind(this);
    }


    render() {
        let myStyle={
            textAlign: 'center',
            fontWeight: 600,
            borderBottom: 'solid 2px gray'
        };
        return <div className="tabContainer">
            <table style={{padding: 0, margin: 0}}>
                <tr><td colSpan={2}>
                    <table>
                        <tr><th>{config.textmsg.titlelabel}</th><td><input type={'text'} onBlur={this.setTitle} defaultValue={this.props.reportObject.title}/></td></tr>
                        <tr><td /><td><Checkbox label={config.textmsg.responsive}
                              isChecked={this.props.reportObject.responsive}
                              handleCheckboxChange={this.setResponsive}/>
                        &nbsp;<Checkbox label={config.textmsg.maintainaspect}
                            isChecked={this.props.reportObject.maintainAspect}
                            handleCheckboxChange={this.setMaintainAspect}/></td></tr>
                    </table>
                </td></tr>
                <tr><td style={myStyle}>{config.textmsg.title}</td><td style={myStyle}>{config.textmsg.legend}</td></tr>
                <tr>
                <td style={{borderRight: 'solid gray 1px'}}>
                    <ChartFontSelectPanel
                        label={config.textmsg.titlefontlabel}
                        getFontSettings={this.getTitleFontSettings}
                        setFontSettings={this.setTitleFontSettings}/>
                </td><td>
                    <ChartFontSelectPanel
                        label={config.textmsg.legendfontlabel}
                        getFontSettings={this.getLegendFontSettings}
                        setFontSettings={this.setLegendFontSettings}/>
                </td>
                </tr></table>
        </div>
    }

    getLegendFontSettings() {
        return this.props.reportObject.legendFontSettings;
    }

    setLegendFontSettings(name, value) {
        this.props.reportObject.legendFontSettings[name] = value;
    }
    
    getTitleFontSettings() {
        return this.props.reportObject.titleFontSettings;
    }
    
    setTitleFontSettings(name, value) {
        this.props.reportObject.titleFontSettings[name] = value;
    }
    
    setTitle(e) {
        this.props.reportObject.title = e.target.value;
    }
    
    setMaintainAspect(b) {
        this.props.reportObject.maintainAspect = b;
    }
    
    setResponsive(b) {
        this.props.reportObject.responsive = b;
    }
}

export {ChartTitleSetupPanel};