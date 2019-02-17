import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {FontSelectPanel} from "./FontSelectPanel";
import defaults from "../config/defaults";
import {ModalDialog} from "./ModalDialog";
import {TextAlignSelect} from "./TextAlignSelect";
import {ReportSectionSelect} from "./ReportSectionSelect";

const loop = (formats, curformat) => {
    return formats.map((format) => {
        if (curformat && (format.key === curformat)) {
            return <option value={format.format} selected>{format.example}</option>;
        } else {
            return <option value={format.format}>{format.example}</option>;
        }
    });
};

class CurrentDateSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.setFormat = this.setFormat.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);

        if (!this.props.reportObject.format) {
            this.props.reportObject.format = config.dateFormats[0].format
        }
        
        if (!this.props.reportObject.textAlign) {
            this.props.reportObject.textAlign = 'center';
        }
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
                <tr>
                    <th>{config.textmsg.dateformatlabel}</th>
                    <td>
                        <select onChange={this.setFormat}>
                            {loop(config.dateFormats, this.props.reportObject.format)}
                        </select>
                    </td>
                </tr>
            </table>
            <FontSelectPanel
                label={config.textmsg.datefont}
                getFontSettings={this.getFontSettings}
                setFontSettings={this.setFontSettings}/>
            <div className="centerAlign">
                <TextAlignSelect setTextAlign={this.setTextAlign}
                    textAlign={this.props.reportObject.textAlign}/>
            </div>
        </div>
    }
    
    setFormat(info) {
        this.props.reportObject.format = info.target.options[info.target.selectedIndex].value;
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
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: config.defaultFontWeight
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
        return config.textmsg.currentdateobjecttitle;
    }
    
    isComplete() {
        return !!this.props.reportObject.format;
    }
    
    getError() {
        this.state.error = false;
        return 'Please select date format';
    }
    
}

export {CurrentDateSetupPanel};