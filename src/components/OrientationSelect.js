import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });
};

class OrientationSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setOrientation= this.setOrientation.bind(this);

        if (!this.props.settings.orientation) {
            this.props.settings.orientation = 'portrait';
        }
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.orientationlabel}</th><td>
                <select onChange={this.setOrientation}>{loop(["portrait", "landscape"], this.props.settings.orientation)}</select>
            </td></tr>;
            
        } else {
            return <div className="locationSelect">{config.textmsg.orientationlabel}
                <select onChange={this.setOrientation}>{loop(config.pageSections, this.props.settings.orientation)}</select>
            </div>;
        }
    }

    setOrientation(e) {
        this.props.settings.orientation = e.target.options[e.target.selectedIndex].value;
    }
}

export {OrientationSelect};