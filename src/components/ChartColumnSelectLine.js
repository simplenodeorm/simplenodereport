import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {getReportColumn} from './helpers';

class ChartColumnSelectLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let columnData = getReportColumn(this.props.reportColumns[this.props.index].key);
        if (columnData.function) {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    {columnData.function + '(' + columnData.path.replace(/\./g, '->') + ')'}
                </div>
            </div>;
        } else {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    {columnData.path.replace(/\./g, '->')}
                </div>
            </div>;
        }
    }
}

export {ChartColumnSelectLine};