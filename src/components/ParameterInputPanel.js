/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from '../config/runreportconfig.json';
import {ModalDialog} from './ModalDialog';
import {ComparisonValueInput} from './ComparisonValueInput';
import axios from "axios";
import {getServerContext,getRequestHeaders} from "./helpers";

const lookupLoop = (data) => {
    return data.map((item, i) => {
        if (i === 0) {
            return <option value={item.key} selected>{item.name}</option>;
        } else {
            return <option value={item.key}>{item.name}</option>;
        }
    });
};


class ParameterInputPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.allowCharacter = this.allowCharacter.bind(this);
        this.updateLookup = this.updateLookup.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

        this.params = [];
        this.comparisonOperators = [];
        this.lookupValues = {};
    }

    componentDidMount() {
        const curobj = this;
        const lookupDefs = this.props.lookupDefinitions;
        for (let i = 0; i < this.props.whereComparisons.length; ++i) {
            this.params.push('');
            let pos = this.props.whereComparisons[i].fieldName.lastIndexOf('.');
            const fname = this.props.whereComparisons[i].fieldName.substring(pos + 1);
            if (lookupDefs && lookupDefs[fname]) {
                const httpcfg = {
                    headers: getRequestHeaders()
                };
                axios.post(getServerContext() + '/api/report/load/lookuplist', lookupDefs[fname], httpcfg)
                    .then((response) => {
                        if (response.status === 200) {
                            curobj.setValue(0, response.data[0].key);
                            curobj.updateLookup(fname, response.data)

                        } else {
                            curobj.setState({error: 'Error: HTTP status ' + response.status})
                        }
                    })
                    .catch((err) => {
                        curobj.setState({error: err.toString()});
                    });
            }
        }
    }

    getContent() {
        const lookupDefs = this.props.lookupDefinitions;
        const curobj = this;
        const inputLoop = (data) => {
            return data.map((p, i) => {
                let pos = p.fieldName.lastIndexOf('.');
                this.comparisonOperators.push(p.comparisonOperator);
                const fname = p.fieldName.substring(pos + 1);
                if (lookupDefs && lookupDefs[fname]) {
                    if (this.lookupValues[fname]) {
                        return <tr>
                            <td className="inputLabel">{lookupDefs[fname].displayLabel + ':'}</td>
                            <td>
                                <select name={'s' + i} onChange={curobj.onSelectChange}>{lookupLoop(curobj.lookupValues[fname])}</select>
                            </td>
                        </tr>
                    } else {
                        return <tr>
                            <td className="inputLabel">{fname + ':'}</td>
                            <td><select></select></td></tr>;
                    }
                } else {
                    return <tr>
                        <td title={p.fieldName} className="inputLabel">{fname + ':'}</td>
                        <td>
                            <ComparisonValueInput
                                setValue={this.setValue}
                                getValue={this.getValue}
                                allowCharacter={this.allowCharacter}
                                fieldType={p.fieldType}
                                usePortal="true"
                                index={i}/>
                        </td>
                    </tr>
                }
            });
        };
        
        return <div className="parameterInputPanel">
            <div className="inputEntryList">
                <table>{inputLoop(this.props.whereComparisons)}</table>
            </div>
        </div>;
    }

    updateLookup(fieldName, data) {
        this.lookupValues[fieldName] = data;
        this.setState({update: true});
    }

    onSelectChange(e) {
        let indx = Number(e.target.name.substring(1));
        this.setValue(indx, e.target.options[e.target.selectedIndex].value);
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
        return (this.comparisonOperators[indx] === 'in') && (charCode === 188);
    }
    
    getResult() {
        return { 
            interactive: true,
            parameters: this.params
        };
    }
}

export {ParameterInputPanel};