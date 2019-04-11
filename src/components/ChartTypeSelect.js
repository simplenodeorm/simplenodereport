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

class ChartTypeSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setReportSection = this.setReportSection.bind(this);

        if (!this.props.reportObject.chartType) {
            this.props.reportObject.chartType = 'bar';
        }
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.charttypelabel}</th><td>
                <select onChange={this.setChartType}>{loop(config.chartTypes, this.props.reportObject.chartType)}</select>
            </td></tr>;
            
        } else {
            return <div className="locationSelect">{config.textmsg.charttypelabel}
                <select onChange={this.setReportSection}>{loop(config.chartTypes, this.props.reportObject.chartType)}</select>
            </div>;
        }
    }

    setReportSection(e) {
        this.props.reportObject.chartType = e.target.options[e.target.selectedIndex].value;
    }
}

export {ChartTypeSelect};