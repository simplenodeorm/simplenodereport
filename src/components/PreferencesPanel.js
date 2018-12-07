import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import defaults from '../config/defaults.json';
import {ModalDialog} from './ModalDialog';
import {NumericInput} from './NumericInput';

const preferenceNames = ['marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'fontSize', 'documentSize'];
const documentSizeLoop = (docSize, data) => {
    return data.map((item) => {
        if (docSize === item) {
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
        this.setFontSize = this.setFontSize.bind(this);
        this.setDocumentSize = this.setDocumentSize.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        
         this.myPreferences = JSON.parse(localStorage.getItem('preferences'));
        
        if (!this.myPreferences || !this.myPreferences.documentSize) {                        
            this.myPreferences = defaults;
        }

    }

    getContent() {
        return <div className="preferencesPanel">
            <table>
            <tr><th>{config.textmsg.leftmargin}</th><td><NumericInput maxLength='4' onBlur={this.setLeftMargin} allowCharacter={this.allowCharacter}  defaultValue={this.myPreferences.marginLeft}/></td></tr>
                <tr><th>{config.textmsg.topmargin}</th><td><NumericInput maxLength='4' onBlur={this.setTopMargin} allowCharacter={this.allowCharacter}  defaultValue={this.myPreferences.marginTop}/></td></tr>
                <tr><th>{config.textmsg.rightmargin}</th><td><NumericInput maxLength='4' onBlur={this.setRightMargin} allowCharacter={this.allowCharacter}  defaultValue={this.myPreferences.marginRight}/></td></tr>
                <tr><th>{config.textmsg.bottommargin}</th><td><NumericInput maxLength='4' onBlur={this.setBottomMargin} allowCharacter={this.allowCharacter}  defaultValue={this.myPreferences.marginBottom}/></td></tr>
                <tr><th>{config.textmsg.fontsize}</th><td><NumericInput maxLength='2' onBlur={this.setFontSize} defaultValue={this.myPreferences.fontSize}/></td></tr>
                <tr><th>{config.textmsg.documentsize}</th><td>
                    <select onChange={this.setDocumentSize}>
                    {documentSizeLoop(this.myPreferences.documentSize, config.documentSizeNames)}
                    </select>
                    </td></tr>
            </table>
        </div>;
    }

    setLeftMargin(e) {
        this.myPreferences.marginLeft = e.target.value;
    }
    
    setTopMargin(e) {
        this.myPreferences.marginTop = e.target.value;
    }
        
    setRightMargin(e) {
        this.myPreferences.marginRight = e.target.value;
    }
    
    setBottomMargin(e) {
        this.myPreferences.marginBottom = e.target.value;
    }
    
    setFontSize(e) {
        this.myPreferences.fontSize = e.target.value;
    }
    
    setDocumentSize(e) {
        this.myPreferences.documentSize = e.target.options[e.target.selectedIndex].value;
    }

    isComplete() {
        let retval = true;
    
        for (let i = 0; i < preferenceNames.length; ++i) {
            if (!this.myPreferences[preferenceNames[i]]) {
                retval = false;
                break;
            }
        }
        
        return retval;
    }
    
    getTitle() {
        return config.textmsg.defaultsettings;
    }
    
    getResult() {
        return this.myPreferences;
    }
    
    allowCharacter(charCode) {
        if (charCode === 190) {
            return true;
        } else {
            return false;
        }
    }

}

export {PreferencesPanel};