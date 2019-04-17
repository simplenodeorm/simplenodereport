import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {FontSelectPanel} from './FontSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";
import defaults from "../config/defaults";
import {Checkbox} from "./Checkbox";
import {TitlePositionSelect} from "./TitlePositionSelect";

class ChartTitlePanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        
        if (!this.props.reportObject.titleFontSettings) {
            this.props.reportObject.titleFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: defaults.defaultFontWeight,
            };
            
            this.props.reportObject.displayTitle = true;
        }
        
        
        this.getTitleFontSettings = this.getTitleFontSettings.bind(this);
        this.setTitleFontSettings = this.setTitleFontSettings.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }
    
    
    render() {
        return <div className="tabContainer">
            <input type={'text'} style={{width: '150px'}} defaultValue={'my title'} onBlur={this.setTitle}/>
            &nbsp;&nbsp;&nbsp;
            <Checkbox label={config.textmsg.displaytitle}
                      handleCheckboxChange={this.setDisplay}
                      isChecked={this.props.reportObject.displayTitle}/>
            &nbsp;&nbsp;&nbsp;
            <TitlePositionSelect reportObject={this.props.reportObject} />
            <hr />
            <FontSelectPanel
                label={config.textmsg.legendfontlabel}
                getFontSettings={this.getTitleFontSettings}
                setFontSettings={this.setTitleFontSettings}/>
        </div>
    }
    
    setDisplay(checked) {
        this.props.reportObject.displayTitle = checked;
    }
    
    getTitleFontSettings() {
        return this.props.reportObject.titleFontSettings;
    }
    
    setTitleFontSettings(name, value) {
        this.props.reportObject.titleFontSettings[name] = value;
    }
    
    setTitle(e) {
        this.props.reportObject.title = e.value;
    }
}

export {ChartTitlePanel};