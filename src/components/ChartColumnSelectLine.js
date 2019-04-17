import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {Checkbox} from './Checkbox';
import {getReportColumn} from './helpers';

class ChartColumnSelectLine extends React.Component {
    constructor(props) {
        super(props);
        
        this.setDataAxis = this.setDataAxis.bind(this);
        this.setCategoryAxis = this.setCategoryAxis.bind(this);
        this.categorySelectionExists = this.categorySelectionExists.bind(this);
        this.canChangeCategory = this.canChangeCategory.bind(this);
        this.canChangeData = this.canChangeData.bind(this);
        this.dataSelectionExists = this.dataSelectionExists.bind(this);
    }

    render() {
        let columnData = getReportColumn(this.props.reportColumns[this.props.index].key);
        if (columnData.function) {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <span className="label">{this.props.index + 1}.</span>
                    &nbsp;{columnData.function + '(' + columnData.path.replace(/\./g, '->') + ')'}
                 </div>
                {this.getAxisCheckboxes()}
            </div>;
        } else {
            return <div className="columnSelectLine">
                <div className="lineStyle1">
                    <span className="label">{this.props.index + 1}.</span>
                    &nbsp;{columnData.path.replace(/\./g, '->')}
                </div>
                {this.getAxisCheckboxes()}
            </div>;
        }
    }
    
    getAxisCheckboxes() {
        return <div>&nbsp;&nbsp;<Checkbox
            isChecked={this.props.reportColumns[this.props.index].axis === 'data'}
            handleCheckboxChange={this.setDataAxis}
            canChange={this.canChangeData}
            label={'Data Axis'}/>&nbsp;
        <Checkbox
            isChecked={this.props.reportColumns[this.props.index].axis === 'category'}
            handleCheckboxChange={this.setCategoryAxis}
            canChange={this.canChangeCategory}
            label={'Category Axis'}/></div>
    }
    
    canChangeCategory(val) {
        let retval = true;
        if (val && (this.props.reportColumns[this.props.index].axis === 'data')) {
            alert(config.textmsg.catanddatamutuallyexclusive);
            retval = false;
        } else if (val && this.categorySelectionExists()) {
            alert(config.textmsg.onecatallowed);
            retval = false;
        }
        return retval;
    }
    
    canChangeData(val) {
        let retval = true;
        if (val && (this.props.reportColumns[this.props.index].axis === 'category')) {
            alert(config.textmsg.catanddatamutuallyexclusive);
            retval = false;
        } else if ((this.props.chartType === 'pie') || (this.props.chartType === 'doughnut')) {
            if (val && this.dataSelectionExists()) {
                alert(config.textmsg.onedataallowed);
                retval = false;
            }
        }
        return retval;
    }

    setCategoryAxis(b) {
        if (b) {
            this.props.reportColumns[this.props.index].axis = 'category';
        } else {
            this.props.reportColumns[this.props.index].axis = '';
        }
    }
    
    categorySelectionExists() {
        let retval = false;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if ((this.props.index !== i)
                && this.props.reportColumns[i].axis
                && (this.props.reportColumns[i].axis === 'category')) {
                retval = true;
                break;
            }
        }
        
        return retval;
    }
    
    dataSelectionExists() {
        let retval = false;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if ((this.props.index !== i)
                && this.props.reportColumns[i].axis
                && (this.props.reportColumns[i].axis === 'data')) {
                retval = true;
                break;
            }
        }
        
        return retval;
    }
    
    
    setDataAxis(b) {
        if (b) {
            this.props.reportColumns[this.props.index].axis = 'data';
        } else {
            this.props.reportColumns[this.props.index].axis = 'data';
        }
    }
}

export {ChartColumnSelectLine};