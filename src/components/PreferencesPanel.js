import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import defaults from '../config/defaults.json';
import {ModalDialog} from './ModalDialog';
import {NumericInput} from './NumericInput';

const defaultNames = ['marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'fontSize', 'documentSize'];


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

    }
    
    
    getContent() {
        return <div className="preferencesPanel">
            <table>
            <tr><th>{config.textmsg.leftmargin}</th><td><NumericInput maxLength='4' onBlur={this.setLeftMargin} allowCharacter={this.allowCharacter}  defaultValue={defaults.marginLeft}/></td></tr>
                <tr><th>{config.textmsg.topmargin}</th><td><NumericInput maxLength='4' onBlur={this.setTopMargin} allowCharacter={this.allowCharacter}  defaultValue={defaults.marginTop}/></td></tr>
                <tr><th>{config.textmsg.rightmargin}</th><td><NumericInput maxLength='4' onBlur={this.setRightMargin} allowCharacter={this.allowCharacter}  defaultValue={defaults.marginRight}/></td></tr>
                <tr><th>{config.textmsg.bottommargin}</th><td><NumericInput maxLength='4' onBlur={this.setBottomMargin} allowCharacter={this.allowCharacter}  defaultValue={defaults.marginBottom}/></td></tr>
                <tr><th>{config.textmsg.fontsize}</th><td><NumericInput maxLength='2' onBlur={this.setFontSize} defaultValue={defaults.fontSize}/></td></tr>
                <tr><th>{config.textmsg.documentsize}</th><td>
                    <select onChange={this.setDocumentSize}>
                        <option value="LETTER">LETTER</option>
                        <option value="LEGAL">LEGAL</option>
                        <option value="4A0">4A0</option>
                        <option value="2A0">2A0</option>
                        <option value="A0">A0</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        <option value="A5">A5</option>
                        <option value="A6">A6</option>
                        <option value="A7">A7</option>
                        <option value="A8">A8</option>
                        <option value="A9">A9</option>
                        <option value="A10">A10</option>
                    </select>
                    </td></tr>
            </table>
        </div>;
    }

    setLeftMargin(e) {
        defaults.leftMargin = e.value;
    }
    
    setTopMargin(e) {
        defaults.topMargin = e.value;
    }
        
    setRightMargin(e) {
        defaults.rightMargin = e.value;
    }
    
    setBottomMargin(e) {
        defaults.bottomMargin = e.value;
    }
    
    setFontSize(e) {
        defaults.fontSize = e.value;
    }
    
    setDocumentSize(e) {
        defaults.documentSize = e.value;
    }

    isComplete() {
        let retval = true;
    
        for (let i = 0; i < defaultNames.length; ++i) {
            if (!defaults[defaultNames[i]]) {
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
        return defaults;
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