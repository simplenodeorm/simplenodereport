/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/RunReport.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {NumericInput} from './NumericInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ComparisonValueInput extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }
    
    render() {
        const val = this.props.getValue(this.props.index);
        switch(this.props.fieldType) {
            case 'date':
                return <DatePicker 
                    withPortal={this.props.usePortal}
                    className="dateInput"
                    dateFormat="MM/DD/YYYY"
                    selected={val} 
                    onChange={this.onBlur} />;
            case 'number':
            case 'float':
            case 'int':
            case 'bigint':
                return <NumericInput
                    maxLength='8' 
                    onBlur={this.onBlur}
                    index={this.props.index}
                    allowCharacter={this.props.allowCharacter}
                    defaultValue={val}/>;
        }
    }

    onBlur(val) {
        if (this.props.fieldType === 'date') {
            this.props.setValue(this.props.index, val);
        } else {
            this.props.setValue(this.props.index, val.target.value);
        }
    }
}

export {ComparisonValueInput};