import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ColorSelect} from './ColorSelect';
import {SizeSelect} from './SizeSelect';
import {getReportColumn,allowMultipleChartDataAxis} from './helpers';

class ChartDataAxisLine extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.reportColumn.color) {
            this.props.reportColumn.color = config.defaultDataAxisColor;
        }
        
        this.deleteAxis = this.deleteAxis.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.setSize = this.setSize.bind(this);
    }
    
    render() {
        let columnData = getReportColumn(this.props.reportColumn.key);
        let allowColor = allowMultipleChartDataAxis(this.props.chartType);
        if (columnData.function) {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <img alt="delete data axis" src="/images/delete.png" onClick={this.deleteAxis}/>
                    &nbsp;{columnData.function + '(' + columnData.path.replace(/\./g, '->') + ')'}
                 </div>
                {allowColor &&
                <span>
                    &nbsp;&nbsp;{config.textmsg.colorlabel}&nbsp;<ColorSelect asSpan={true} currentColor={this.props.reportColumn.color} setColor={this.setColor}/>
                    &nbsp;&nbsp;{config.textmsg.sizelabel}&nbsp;<SizeSelect sizes={config.borderWidths} setSize={this.setSize} currentSize={this.props.reportColumn.borderWidth}/>
                    &nbsp;&nbsp;{config.textmsg.labellabel}&nbsp;<input type={'text'} defaultValue={this.props.reportColumn.label} onBlur={this.setLabel}/>
                </span>}
            </div>;
        } else {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <img alt="delete data axis" src="/images/delete.png" onClick={this.deleteAxis}/>
                    &nbsp;{columnData.path.replace(/\./g, '->')}
                </div>
                {allowColor &&
                <span>
                    &nbsp;&nbsp;{config.textmsg.colorlabel}&nbsp;<ColorSelect asSpan={true} currentColor={this.props.reportColumn.color} setColor={this.setColor}/>
                    &nbsp;&nbsp;{config.textmsg.sizelabel}&nbsp;<SizeSelect sizes={config.borderWidths} setSize={this.setSize} currentSize={this.props.reportColumn.borderWidth}/>
                    &nbsp;&nbsp;{config.textmsg.labellabel}&nbsp;<input type={'text'} defaultValue={this.props.reportColumn.label} onBlur={this.setLabel}/>
                </span>}
            </div>;
        }
    }

    deleteAxis() {
        this.props.reportColumn.axis = '';
        this.props.updateDataAxis();
    }
    
    setColor(color) {
        this.props.reportColumn.color = color;
    }
    
    setLabel(e) {
        this.props.reportColumn.label = e.target.value;
    }
    
    setSize(e) {
        this.props.reportColumn.borderWidth = e.target.value;
    }
}

export {ChartDataAxisLine};