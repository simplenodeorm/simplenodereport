/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {FontSelectPanel} from "./FontSelectPanel";
import defaults from "../config/defaults";
import {ModalDialog} from "./ModalDialog";
import {TextAlignSelect} from "./TextAlignSelect";

const formatLoop = (formats, curformat) => {
    return formats.map((format) => {
        if (curformat && (format.key === curformat)) {
            return <option value={format.key} selected>{format.example}</option>;
        } else {
            return <option value={format.key}>{format.example}</option>;
        }
    });
};

const locationLoop = (locations, curlocation) => {
    return locations.map((loc) => {
        if (curlocation && (loc.key === curlocation)) {
            return <option value={loc.key} selected>{loc.name}</option>;
        } else {
            return <option value={loc.key}>{loc.name}</option>;
        }
    });
};

class PageNumberSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.setFormat = this.setFormat.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);
        this.setLocation = this.setLocation.bind(this);

        if (!this.props.reportObject.format) {
            this.props.reportObject.format = config.pageNumberFormats[0].key;
        }
    
        if (!this.props.reportObject.location) {
            this.props.reportObject.location = config.pageNumberLocations[0].key;
        }

        if (!this.props.reportObject.textAlign) {
            this.props.reportObject.textAlign = 'center';
        }
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <tr>
                    <th>{config.textmsg.pagenumlocationlabel}</th>
                    <td>
                        <select onChange={this.setLocation}>
                            {locationLoop(config.pageNumberLocations, this.props.reportObject.location)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>{config.textmsg.pagenumformatlabel}</th>
                    <td>
                        <select onChange={this.setFormat}>
                            {formatLoop(config.pageNumberFormats, this.props.reportObject.format)}
                        </select>
                    </td>
                </tr>
            </table>
            <FontSelectPanel
                label={config.textmsg.pagenumfont}
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
    
    setLocation(info) {
        this.props.reportObject.location = info.target.options[info.target.selectedIndex].value;
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
        if (this.props.reportObject.location.startsWith('b')) {
            this.props.reportObject.reportSection = "footer";
        } else {
            this.props.reportObject.reportSection = "header";
        }
        
        return this.props.reportObject;
    };
    
    getTitle() {
        return config.textmsg.pagenumberobjecttitle;
    }
    
    isComplete() {
        return (this.props.reportObject.format && this.props.reportObject.location);
    }
    
    getError() {
        this.state.error = false;
        return 'Please select page number format and location';
    }
    
}

export {PageNumberSetupPanel};