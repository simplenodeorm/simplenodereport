import React from 'react';
import "../app/App.css";
import {getReportColumn} from './helpers';
class ChartDataAxisLine extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let columnData = getReportColumn(this.props.reportColumn.key);
        if (columnData.function) {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    &nbsp;{columnData.function + '(' + columnData.path.replace(/\./g, '->') + ')'}
                 </div>
            </div>;
        } else {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    &nbsp;{columnData.path.replace(/\./g, '->')}
                </div>
            </div>;
        }
    }
    
    onDelete() {
        this.props.reportColumn.axis = '';
        this.props.updateDataAxis();
    }
}

export {ChartDataAxisLine};