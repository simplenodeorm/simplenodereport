import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {FontSelectPanel} from "./FontSelectPanel";
import defaults from "../config/defaults";
import {ModalDialog} from "./ModalDialog";
import {TextAlignSelect} from "./TextAlignSelect";
import {ReportSectionSelect} from "./ReportSectionSelect";


class LabelSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.setLabelText = this.setLabelText.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);
    }
    
    getContent() {
        return <div>
            <ReportSectionSelect reportObject={this.props.reportObject} />
            <div  className="centerAlign">
                <input className="nameInput" type="text" size="20"
                    onBlur={this.setLabelText}
                    defaultValue={this.props.reportObject.labelText}/>
           </div>
            <FontSelectPanel
                label={config.textmsg.labelfont}
                getFontSettings={this.getFontSettings}
                setFontSettings={this.setFontSettings}/>
            <div className="centerAlign">
                <TextAlignSelect setTextAlign={this.setTextAlign}
                    textAlign={this.props.reportObject.textAlign}/>
            </div>
        </div>
    }
    
    setLabelText(info) {
        this.props.reportObject.labelText = info.target.value;
    }
    
    setTextAlign(value) {
        this.props.reportObject.textAlign = value
    }
    
    getFontSettings() {
        if (!this.props.reportObject.fontSettings) {
            this.props.reportObject.fontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: 'transparent',
                fontWeight: 300
            };
        }
        
        return this.props.reportObject.fontSettings;
    }
    
    setFontSettings(name, value) {
        this.props.reportObject.fontSettings[name] = value;
    }
    
    getResult() {
        return this.props.reportObject;
    };
    
    getTitle() {
        return config.textmsg.labelobjecttitle;
    }
    
    isComplete() {
        return !!this.props.reportObject.labelText;
    }
    
    getError() {
        this.state.error = false;
        return 'Please enter label text';
    }
    
}

export {LabelSetupPanel};