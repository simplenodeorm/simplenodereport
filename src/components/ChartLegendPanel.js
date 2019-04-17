import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {FontSelectPanel} from './FontSelectPanel';
import {Checkbox} from './Checkbox';
import config from '../config/appconfig.json';
import "../app/App.css";
import {LegendPositionSelect} from "./LegendPositionSelect";
import defaults from "../config/defaults";

class ChartLegendPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
    
        if (!this.props.reportObject.legendFontSettings) {
            this.props.reportObject.legendFontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: defaults.fontWeight
            };
    
            this.props.reportObject.displayLegend = true;
        }
    
    
        this.getLegendFontSettings = this.getLegendFontSettings.bind(this);
        this.setLegendFontSettings = this.setLegendFontSettings.bind(this);
        this.onDisplay = this.onDisplay.bind(this);
    }


    render() {
        return <div className="tabContainer">
            <Checkbox label={config.textmsg.displaylegend}
                 handleCheckboxChange={this.onDisplay}
                 isChecked={this.props.reportObject.displayLegend}/>
            &nbsp;&nbsp;&nbsp;
            <LegendPositionSelect reportObject={this.props.reportObject} />
            <hr />
            <FontSelectPanel
                label={config.textmsg.legendfontlabel}
                getFontSettings={this.getLegendFontSettings}
                setFontSettings={this.setLegendFontSettings}/>
        </div>
    }

    onDisplay(checked) {
        this.props.reportObject.displayLegend = checked;
    }
    
    getLegendFontSettings() {
        return this.props.reportObject.legendFontSettings;
    }

    setLegendFontSettings(name, value) {
        this.props.reportObject.legendFontSettings[name] = value;
    }
}

export {ChartLegendPanel};