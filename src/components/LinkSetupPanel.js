/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {ModalDialog} from "./ModalDialog";
import {Checkbox} from './Checkbox';
import {ReportSectionSelect} from "./ReportSectionSelect";
import {FontSelectPanel} from "./FontSelectPanel";
import {TextAlignSelect} from "./TextAlignSelect";
import defaults from "../config/defaults";

class LinkSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.setLinkText= this.setLinkText.bind(this);
        this.showInNewTab = this.showInNewTab.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
                <tr>
                    <th>{config.textmsg.urllabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.url} onBlur={this.setUrl}/></td>
                </tr>
                <tr>
                    <th>{config.textmsg.linktextlabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.linkText} onBlur={this.setLinkText}/></td>
                </tr>
                <tr>
                    <th/><td><Checkbox label={config.textmsg.showinnewtab}
                        isChecked={this.props.reportObject.showInNewTab}
                        handleCheckboxChange={this.showInNewTab}/></td>
                </tr>
                <tr><td colSpan="2"><div className="centerAlign">
                <FontSelectPanel
                    label={config.textmsg.linkfont}
                    getFontSettings={this.getFontSettings}
                    setFontSettings={this.setFontSettings}/></div></td></tr>
                    <tr><td colSpan="2">
                    <div className="centerAlign">
                    <TextAlignSelect setTextAlign={this.setTextAlign}
                        textAlign={this.props.reportObject.textAlign}/>
                    </div></td></tr>
            </table></div>;
    }
    
    setUrl(info) {
        this.props.reportObject.url = info.target.value;
    }
    
    setLinkText(info) {
        this.props.reportObject.linkText = info.target.value;
    }
    
    setTextAlign(value) {
        this.props.reportObject.textAlign = value;
    }
    
    showInNewTab(showInNewTab) {
        this.props.reportObject.showInNewTab = showInNewTab;
    }
    
    getFontSettings() {
        if (!this.props.reportObject.fontSettings) {
            this.props.reportObject.fontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: config.defaultFontWeight
            };
    
            this.props.reportObject.textAlign = 'left';
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
        return config.textmsg.linkobjecttitle;
    }
    
    isComplete() {
        return !!this.props.reportObject.url;
    }
    
    getError() {
        this.state.error = false;
        return 'Please enter url and link display text';
    }
    
}

export {LinkSetupPanel};