import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const pointStyles = ["circle", "cross", "dash", "line", "rect", "star", "triangle"];
const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });
};

class PointStyleSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setPointStyle = this.setPointStyle.bind(this);

        if (!this.props.reportObject.pointStyle) {
            this.props.reportObject.pointStyle = 'circle';
        }
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.pointstylelabel}</th><td>
                <select onChange={this.setPointStyle}>{loop(pointStyles, this.props.reportObject.pointStyle)}</select>
            </td></tr>;
            
        } else {
            return <div className="locationSelect">{config.textmsg.pointstylelabel}
                <select onChange={this.setPointSTyle}>{loop(pointStyles, this.props.reportObject.legendPosition)}</select>
            </div>;
        }
    }

    setPointStyle(e) {
        this.props.reportObject.pointStyle = e.target.options[e.target.selectedIndex].value;
    }
}

export {PointStyleSelect};