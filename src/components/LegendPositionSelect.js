import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info.key === cur)) {
            return <option value={info.key} selected>{info.text}</option>;
        } else {
            return <option value={info.key}>{info.text}</option>;
        }
    });
};

class LegendPositionSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setLegendPosition = this.setLegendPosition.bind(this);

        if (!this.props.reportObject.legendPosition) {
            this.props.reportObject.legendPosition = config.defaultLegendPosition;
        }
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.positionlabel}</th><td>
                <select onChange={this.setLegendPosition}>{loop(config.chartLegendPositions, this.props.reportObject.legendPosition)}</select>
            </td></tr>;
            
        } else {
            return <div className="locationSelect">{config.textmsg.positionlabel}
                <select onChange={this.setLegendPosition}>{loop(config.chartLegendPositions, this.props.reportObject.legendPosition)}</select>
            </div>;
        }
    }

    setLegendPosition(e) {
        this.props.reportObject.legendPosition = e.target.options[e.target.selectedIndex].value;
    }
}

export {LegendPositionSelect};