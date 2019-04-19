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

class ChartTitlePositionSelect extends React.Component{
    constructor(props) {
        super(props);

        if (!this.props.currentPosition) {
            this.props.currentPosition = config.defaultLegendPosition;
        }
    }
    
    render() {
            return <div className="locationSelect">
                <select onChange={this.props.setPosition}>{loop(config.chartLegendPositions, this.props.currentPosition)}</select>
            </div>;
    }
}

export {ChartTitlePositionSelect};