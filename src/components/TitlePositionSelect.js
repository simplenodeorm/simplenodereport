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

class TitlePositionSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setTitlePosition = this.setTitlePosition.bind(this);

        if (!this.props.reportObject.titlePosition) {
            this.props.reportObject.titlePosition = config.defaultTitlePosition;
        }
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.positionlabel}</th><td>
                <select onChange={this.setTitlePosition}>{loop(config.chartLegendPositions, this.props.reportObject.titlePosition)}</select>
            </td></tr>;
            
        } else {
            return <div className="locationSelect">{config.textmsg.positionlabel}
                <select onChange={this.setTitlePosition}>{loop(config.chartLegendPositions, this.props.reportObject.titlePosition)}</select>
            </div>;
        }
    }

    setTitlePosition(e) {
        this.props.reportObject.titlePosition = e.target.options[e.target.selectedIndex].value;
    }
}

export {TitlePositionSelect};