import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import defaults from '../config/defaults.json';
import {ModalDialog} from './ModalDialog';
import {NumericInput} from './NumericInput';
import {QuerySelector} from './QuerySelector';

const preferenceNames = ['marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'fontFamily', 'font', 'fontSize', 'documentSize'];

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
        this.setDocumentName = this.setDocumentName.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        
         this.settings = JSON.parse(localStorage.getItem('preferences'));
        
        if (!this.settings || !this.settings.documentSize) {                        
            this.settings = defaults;
        }

        if (this.props.newDocument) {
            document.designData.document = new Object();
            document.designData.document.settings = this.settings;
        }
        
    }

    getContent() {
        return <div className="preferencesPanel">
            <table>
                {this.props.newDocument && <tr><th>{config.textmsg.documentnamelabel}</th><td><input className="nameInput" type="text" size="20" onBlue={this.setDocumentName} defaultValue={document.designData.document.documentName} /></td></tr> }
                {this.props.newDocument && <tr><th>{config.textmsg.backingquery}</th><td><QuerySelector setQuery="{this.setQuery}"/></td></tr> }
            
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

    setDocumentName(e) {
    }
    
    setQuery(e) {
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
    
        for (let i = 0; i < preferenceNames.length; ++i) {
            if (!this.settings[preferenceNames[i]]) {
                retval = false;
                break;
            }
        }
        
        if (retval && this.props.newDocument) {
            if (!document.designData.document.settings.documentName
               || !document.designData.document.settings.backingQuery) {
               retval = false;
            }
        }
        return retval;
    }
    
    getTitle() {
        if (this.props.newDocument) {
            return config.textmsg.adddocument;
        } else {
            return config.textmsg.defaultsettings;
        }
    }
    
    getResult() {
        if (this.props.newDocument) {
            return document.designData.document;
        } else {
            return this.settings;
        }
    }
    
    allowCharacter(charCode) {
        if (charCode === 190) {
            return true;
        } else {
            return false;
        }
    }

    onCancel() {
        document.designData.document = '';
        super.onCancel();
    }

}

export {PreferencesPanel};