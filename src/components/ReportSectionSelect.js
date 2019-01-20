import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class ReportSectionSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setReportSection = this.setReportSection.bind(this);
    }
    
    setLocation(location) {
        this.setState({location: location});
    }

    render() {
        return <div className="locationSelect">{config.textmsg.targetlocationlabel}
            <select onChange={this.setReportSection}>
                <option value="header">{config.textmsg.header}</option>
                <option value="body">{config.textmsg.body}</option>
                <option value="footer">{config.textmsg.footer}</option>
            </select>
        </div>;
    }

    setReportSection(e) {
        this.props.setReportSection(e.target.options[e.target.selectedIndex].value);
    }
}

export {ReportSectionSelect};