/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";

const stringOptions = ["none", "email", "link", "image"];
const numericOptions = ["none", "sum", "avg", "max", "min"];
const loop = (data, cursel) => {
    return data.map((info) => {
        if (cursel === info) {
            return <option value={info} selected>{info}</option>
        } else {
            return <option value={info}>{info}</option>
        }
    });
};

class SpecialHandlingSelect extends React.Component {
    constructor(props) {
        super(props);
        this.setSpecialHandlingType = this.setSpecialHandlingType.bind(this);
        
        this.state = {
            disabled: this.props.disabled
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({disabled: nextProps.disabled});
    }
    
    
    render() {
        const {disabled} = this.state;
        let cval = this.props.reportColumn.specialHandlingType;
        if (!cval) {
            cval = 'none';
        }
    
        let dis = '';
        if (disabled) {
            dis = 'disabled';
            this.props.setSpecialHandlingType("none");
        }
    
        let opts;
        if (this.props.reportColumn.isString) {
            opts = stringOptions;
        } else if (this.props.reportColumn.isNumeric) {
            opts = numericOptions;
        }
    
        if (opts) {
         return (<div className="locationSelect">
            {config.textmsg.specialhandlinglabel}
            <select onChange={this.setSpecialHandlingType} disabled={dis}>
                {loop(opts, cval)}
            </select></div>);
        } else {
            return <span />
        }
    }

    setSpecialHandlingType(info) {
        this.props.setSpecialHandlingType(info.target.options[info.target.selectedIndex].value);
    }
}

export {SpecialHandlingSelect};