import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ColorSelect} from './ColorSelect';
import {getReportColumn} from './helpers';

class ChartDataAxisLine extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.reportColumn.color) {
            this.props.reportColumn.color = config.defaultDataAxisColor;
        }
        
        this.deleteAxis = this.deleteAxis.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setLabel = this.setLabel.bind(this);
    }
    
    render() {
        let columnData = getReportColumn(this.props.reportColumn.key);
        if (columnData.function) {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <img alt="delete data axis" src="/images/delete.png" onClick={this.deleteAxis}/>
                    &nbsp;{columnData.function + '(' + columnData.path.replace(/\./g, '->') + ')'}
                 </div>
                <table>
                    <tr><td>{config.textmsg.colorlabel}</td><td><ColorSelect currentColor={this.props.reportColumn.color} setColor={this.setColor}/></td></tr>
                    <tr><td>{config.textmsg.labellabel}</td><td><input type={'text'} defaultValue={this.props.reportColumn.label} onBlur={this.setLabel}/></td></tr>
                </table>
            </div>;
        } else {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <img alt="delete data axis" src="/images/delete.png" onClick={this.deleteAxis}/>
                    &nbsp;{columnData.path.replace(/\./g, '->')}
                </div>
                <table>
                    <tr><td>{config.textmsg.colorlabel}</td><td><ColorSelect currentColor={this.props.reportColumn.color} setColor={this.setColor}/></td></tr>
                    <tr><td>{config.textmsg.labellabel}</td><td><input type={'text'} defaultValue={this.props.reportColumn.label} onBlur={this.setLabel}/></td></tr>
                </table>
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
}

export {ChartDataAxisLine};