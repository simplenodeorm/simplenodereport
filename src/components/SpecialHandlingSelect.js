import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";

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
        
        return (<div className="locationSelect">
            {config.textmsg.specialhandlinglabel}
            <select onChange={this.setSpecialHandlingType} disabled={dis}>
            {this.props.reportColumn.isString && loop(["none", "email", "link", "image"], cval)}
            {this.props.reportColumn.isNumeric && loop(["none", "sum", "avg", "max", "min"], cval)}
            </select></div>);
    }

    setSpecialHandlingType(info) {
        this.props.setSpecialHandlingType(info.target.options[info.target.selectedIndex].value);
    }
}

export {SpecialHandlingSelect};