import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const sections = ["header", "body", "footer"];

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
    }
    
    render() {
        return <div className="locationSelect">{config.textmsg.targetlocationlabel}
            <select onChange={this.setReportSection}>{loop(sections, this.props.reportObject.reportSection)}</select>
        </div>;
    }

    setReportSection(e) {
        this.props.reportObject.reportSection = e.target.options[e.target.selectedIndex].value;
    }
}

export {ReportSectionSelect};