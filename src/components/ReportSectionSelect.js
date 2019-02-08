import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{config.textmsg[info]}</option>;
        } else {
            return <option value={info}>{config.textmsg[info]}</option>;
        }
    });
};

class ReportSectionSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setReportSection = this.setReportSection.bind(this);

        if (!this.props.reportObject.reportSection) {
            this.props.reportObject.reportSection = 'header';
        }
    }
    
    render() {
        return <div className="locationSelect">{config.textmsg.targetlocationlabel}
            <select onChange={this.setReportSection}>{loop(config.pageSections, this.props.reportObject.reportSection)}</select>
        </div>;
    }

    setReportSection(e) {
        this.props.reportObject.reportSection = e.target.options[e.target.selectedIndex].value;
    }
}

export {ReportSectionSelect};