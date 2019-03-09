import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {ModalDialog} from "./ModalDialog";
import {ReportSectionSelect} from "./ReportSectionSelect";
import {FontSelectPanel} from "./FontSelectPanel";
import {TextAlignSelect} from "./TextAlignSelect";
import defaults from "../config/defaults";

class EmailSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setEmailText= this.setEmailText.bind(this);
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
                <tr>
                    <th>{config.textmsg.emaillabel}</th>
                    <td><input type="text"
                        defaultValue={this.props.reportObject.email}
                        onBlur={this.setEmail}/></td>
                </tr>
                <tr>
                    <th>{config.textmsg.linktextlabel}</th>
                    <td><input type="text"
                        defaultValue={this.props.reportObject.emailText}
                        onBlur={this.setEmailText}/></td>
                </tr>
                <tr><td colSpan="2"><div className="centerAlign">
                <FontSelectPanel
                    label={config.textmsg.emailfont}
                    getFontSettings={this.getFontSettings}
                    setFontSettings={this.setFontSettings}/></div></td></tr>
                    <tr><td colSpan="2">
                    <div className="centerAlign">
                    <TextAlignSelect setTextAlign={this.setTextAlign}
                        textAlign={this.props.reportObject.textAlign}/>
                    </div></td></tr>
            </table></div>;
    }
    
    setEmail(info) {
        this.props.reportObject.email = info.target.value;
    }
    
    setEmailText(info) {
        this.props.reportObject.emailText = info.target.value;
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
        return config.textmsg.emailobjecttitle;
    }
    
    isComplete() {
        return !!this.props.reportObject.email;
    }
    
    getError() {
        this.state.error = false;
        return 'Please enter email and display text';
    }
    
}

export {EmailSetupPanel};