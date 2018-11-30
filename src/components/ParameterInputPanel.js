import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ComparisonValueInput} from './ComparisonValueInput';
import {ModalDialog} from './ModalDialog';
import {isUnaryOperator} from './helpers';

class ParameterInputPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.onValidityCheckOnlyChange = this.onValidityCheckOnlyChange.bind(this);
        this.params = [];
        this.comparisonOperators = [];
        this.distinct = false;
        this.validityCheckOnly = false;
        this.resultFormat = 'object';
    }

    getContent() {
        const initParams = (this.params.length === 0);
        const inputLoop = (data) => {
            let ipos = 0;
            return data.map((p, i) => {
                if (!p.comparisonValue && !isUnaryOperator(p.comparisonOperator) && !p.customFilterInput) {
                    if (initParams) {
                        this.params.push('');
                    }
                    let pos = p.fieldName.lastIndexOf('.');
                    this.comparisonOperators.push(p.comparisonOperator);
                    return <tr><td title={p.fieldName} className="inputLabel">{p.fieldName.substring(pos+1) + ':'}</td><td>
                        <ComparisonValueInput 
                            setValue={this.setValue} 
                            getValue={this.getValue}
                            allowCharacter={this.allowCharacter}
                            fieldType={p.fieldType}
                            usePortal="true"
                            index={ipos++} />
                    </td></tr>
                }  else {
                    return undefined;
                }
            });
        };
        
        let formatSelect = <select onChange={this.onResultFormatChange}><option value='object' selected>object graph</option><option value='result set'>result set</option></select>;
        if ( document.designData.currentDocument &&  (document.designData.currentDocument.resultFormat === 'result set')) {
            formatSelect = <select onChange={this.onResultFormatChange}><option value='object'>object graph</option><option value='result set' selected>result set</option></select>;
            this.resultFormat = 'result set';
        }
        
        return <div className="parameterInputPanel">
            <table>
                <tr>
                    <td className="inputLabel">{config.textmsg.resultformatlabel}</td>
                    <td>
                        {formatSelect}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} defaultValue={this.distinct} type="checkbox"/>{config.textmsg.distinct}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onValidityCheckOnlyChange} type="checkbox" defaultValue={this.validityCheckOnly}/>{config.textmsg.validitycheckonly}</td>
                </tr>
            </table>
            <hr />
            <div   className="inputEntryList">
                <table>{inputLoop(document.designData.whereComparisons)}</table>
            </div>
        </div>;
    }
    onResultFormatChange(e) {
        this.resultFormat = e.target.value;
    }

    onDistinctChange(e) {
        this.distinct = e.target.checked;
    }
    
    onValidityCheckOnlyChange(e) {
        this.validityCheckOnly = e.target.checked;
    }
    
    isComplete() {
        let retval = true;
    
        for (let i = 0; i < this.params.length; ++i) {
            if (!this.params[i]) {
                retval = false;
                break;
            }
        }
        
        return retval;
    }
    
    getTitle() {
        return config.textmsg.paramentrytitle;
    }
    
    getValue(indx) {
        return this.params[indx];
    }
    
    setValue(indx, val) {
        this.params[indx] = val;
    }
    
    allowCharacter(charCode, indx) {
        // allow commas on in
        if ((this.comparisonOperators[indx] === 'in') && (charCode === 188)) {
            return true;
        } else {
            return false;
        }
    }
    
    getResult() {
        return { 
            interactive: true,
            distinct: this.distinct,
            resultFormat: this.resultFormat, 
            validityCheckOnly: this.validityCheckOnly, 
            parameters: this.params,
            authenticator: config.defaultDesignAuthenticator
        };
    }
}

export {ParameterInputPanel};