import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import defaults from '../config/defaults.json';
import {ModalDialog} from './ModalDialog';
import {NumericInput} from './NumericInput';
import {QuerySelector} from './QuerySelector';

const documentSizeLoop = (docSize, data) => {
    return data.map((item) => {
        if (docSize === item) {
            return <option value={item} selected>{item}</option>;
        } else {
            return <option value={item}>{item}</option>;
        }
    });
};

const fontLoop = (font, data) => {
    return data.map((item) => {
        if (font === item) {
            return <option value={item} selected>{item}</option>;
        } else {
            return <option value={item}>{item}</option>;
        }
    });
};

class PreferencesPanel extends ModalDialog {
    constructor(props) {
        super(props);
            
        this.setLeftMargin = this.setLeftMargin.bind(this);
        this.setTopMargin = this.setTopMargin.bind(this);
        this.setRightMargin = this.setRightMargin.bind(this);
        this.setBottomMargin = this.setBottomMargin.bind(this);
        this.setFontFamily = this.setFontFamily.bind(this);
        this.setFont = this.setFont.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setDocumentSize = this.setDocumentSize.bind(this);
        this.setReportName = this.setReportName.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        this.settings = JSON.parse(JSON.stringify(document.designData.currentReport));
        for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
            if (!this.settings[config.defaultPreferenceNames[i]]) {
                this.settings[config.defaultPreferenceNames[i]] = defaults[config.defaultPreferenceNames[i]];
            }
        }
    }

    getContent() {
        return <div className="preferencesPanel">
            <table>
                {this.props.newDocument && <tr><th>{config.textmsg.documentnamelabel}</th><td><input className="nameInput" type="text" size="20" onBlur={this.setReportName} defaultValue={this.settings.reportName} /></td></tr> }
                {this.props.newDocument && <tr><th>{config.textmsg.backingquery}</th><td><QuerySelector setQuery={this.setQuery}/></td></tr> }
            
                <tr><th>{config.textmsg.leftmargin}</th><td><NumericInput maxLength='4' onBlur={this.setLeftMargin} allowCharacter={this.allowCharacter}  defaultValue={this.settings.marginLeft}/></td></tr>
                <tr><th>{config.textmsg.topmargin}</th><td><NumericInput maxLength='4' onBlur={this.setTopMargin} allowCharacter={this.allowCharacter}  defaultValue={this.settings.marginTop}/></td></tr>
                <tr><th>{config.textmsg.rightmargin}</th><td><NumericInput maxLength='4' onBlur={this.setRightMargin} allowCharacter={this.allowCharacter}  defaultValue={this.settings.marginRight}/></td></tr>
                <tr><th>{config.textmsg.bottommargin}</th><td><NumericInput maxLength='4' onBlur={this.setBottomMargin} allowCharacter={this.allowCharacter}  defaultValue={this.settings.marginBottom}/></td></tr>
                <tr><th>{config.textmsg.fontfamily}</th><td><input type="text" className="nameInput" size='20' onBlur={this.setFontFamily} defaultValue={this.settings.fontFamily}/></td></tr>
                <tr><th>{config.textmsg.font}</th><td>
                    <select onChange={this.setFont}>
                    {fontLoop(this.settings.font, config.fonts)}
                    </select>
                    </td></tr>
                <tr><th>{config.textmsg.fontsize}</th><td><NumericInput maxLength='2' onBlur={this.setFontSize} defaultValue={this.settings.fontSize}/></td></tr>
                <tr><th>{config.textmsg.documentsize}</th><td>
                    <select onChange={this.setDocumentSize}>
                    {documentSizeLoop(this.settings.documentSize, config.documentSizeNames)}
                    </select>
                    </td></tr>
            </table>
        </div>;
    }

    setReportName(e) {
        this.settings.reportName = e.target.value;
    }
    
    setQuery(e) {
        this.settings.queryDocumentId = e.target.options[e.target.selectedIndex].value;
    }
    
    setLeftMargin(e) {
        this.settings.marginLeft = e.target.value;
    }
    
    setTopMargin(e) {
        this.settings.marginTop = e.target.value;
    }
        
    setRightMargin(e) {
        this.settings.marginRight = e.target.value;
    }
    
    setBottomMargin(e) {
        this.settings.marginBottom = e.target.value;
    }
    
    setFontFamily(e) {
        this.settings.fontFamily = e.target.value;
    }
    
    setFont(e) {
        this.settings.font = e.target.options[e.target.selectedIndex].value;
    }

    setFontSize(e) {
        this.settings.fontSize = e.target.value;
    }
    
    setDocumentSize(e) {
        this.settings.documentSize = e.target.options[e.target.selectedIndex].value;
    }

    isComplete() {
        let retval = true;
    
        for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
            if (!this.settings[config.defaultPreferenceNames[i]]) {
                if (config.defaultPreferenceNames[i] !== "queryDocumentId") {
                    if (this.props.newDocument) {
                        retval = false;
                        break;
                    }
                }
            }
        }
        
        return retval;
    }
    
    getTitle() {
        if (this.props.newDocument) {
            return config.textmsg.addreport;
        } else {
            return config.textmsg.defaultsettings;
        }
    }
    
    getResult() {
        return this.settings;
    }
    
    allowCharacter(charCode) {
        return charCode === 190;
    }
}

export {PreferencesPanel};