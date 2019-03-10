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
    }
    
    render() {
        let cval = this.props.currentValue;
        if (!cval) {
            cval = 'none';
        }
        return <div className="locationSelect">
            {config.textmsg.specialhandlinglabel}
            <select onChange={this.setSpecialHandlingType}>{loop(["none", "email", "link", "image"], cval)}</select></div>;
    }

    setSpecialHandlingType(info) {
        this.props.setSpecialHandlingType(info.target.options[info.target.selectedIndex].value);
    }
}

export {SpecialHandlingSelect};