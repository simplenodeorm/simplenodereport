import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ChartDataAxisLine} from './ChartDataAxisLine';
import {allowMultipleChartDataAxis,formatSelectColumnForDisplay} from './helpers';

const selectLoop = (data) => {
    return data.map((info) => {
        if (info.isNumeric || info.function) {
            if (!info.axis) {
                return <option value={info.path}>{formatSelectColumnForDisplay(info)}</option>;
            } else {
                return '';
            }
        }
    });
};

class ChartDataSelect extends React.Component{
    constructor(props) {
        super(props);
        this.addDataAxis = this.addDataAxis.bind(this);
        this.setCurrentColumn = this.setCurrentColumn.bind(this);
        this.categorySelected = this.categorySelected.bind(this);
        this.getSelectionContent = this.getSelectionContent.bind(this);
        this.updateDataAxis = this.updateDataAxis.bind(this);
        this.canAdd = this.canAdd.bind(this);
        this.noDataAxisSelected = this.noDataAxisSelected.bind(this);
        
        this.state = {
            update: false
        }
    }
    
    render() {
        const dataIndexLoop = (data) => {
            return data.map((info) => {
                if (info.axis === 'data') {
                    return <ChartDataAxisLine
                        updateDataAxis={this.updateDataAxis}
                        chartType={this.props.chartType} reportColumn={info}/>
                } else {
                    return '';
                }
            });
        };
        
        return <div className={'chartDataSelect'}>
            <span style={{paddingLeft: '24px'}}> {config.textmsg.datalabel}
            {this.getSelectionContent()}</span>
            <div className={'dataAxisContainer'}>
                {dataIndexLoop(this.props.reportColumns)}
            </div>
        </div>
    }
    
    getSelectionContent() {
        let catSelected = this.categorySelected();
        let enableAdd = (this.currentColumn && catSelected && this.canAdd());
        if (catSelected) {
            if (enableAdd) {
                return <span><select onChange={this.setCurrentColumn}><option/>{selectLoop(this.props.reportColumns)}</select>
                        <img alt="add data axis" src="/images/add.png" onClick={this.addDataAxis}/></span>
            } else {
                return <span><select onChange={this.setCurrentColumn}><option/>{selectLoop(this.props.reportColumns)}</select>
                <img alt="add data axis" src="/images/adddisabled.png"/></span>
    
            }
        } else {
            return <span><select/><img alt="add data axis" src="/images/adddisabled.png" /></span>
        }
    }
    
    canAdd() {
        return (allowMultipleChartDataAxis(this.props.chartType)
            || this.noDataAxisSelected());
    }
    
    noDataAxisSelected() {
        let retval = true;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if (this.props.reportColumns[i].axis === 'data') {
                retval = false;
                break;
            }
        }
        
        return retval;
    }
    
    categorySelected() {
        let retval = false;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if (this.props.reportColumns[i].axis
                && (this.props.reportColumns[i].axis === 'category')) {
                retval = true;
                break;
            }
        }
        
        return retval;
    }
    
    updateDataAxis() {
        this.setState({update: true});
    }
    
    addDataAxis() {
        this.currentColumn.axis = 'data';
        if (!this.currentColumn.borderWidth) {
            this.currentColumn.borderWidth = 1;
        }
        this.currentColumn = '';
        this.updateDataAxis();
    }
    
    setCurrentColumn(e) {
        let path = e.target.options[e.target.selectedIndex].value;
        if (path) {
            for (let i = 0; i < this.props.reportColumns.length; ++i) {
                if (path === this.props.reportColumns[i].path) {
                    this.currentColumn = this.props.reportColumns[i];
                    break;
                }
            }
        } else {
            this.currentColumn = '';
        }
        
        this.updateDataAxis();
    }
}

export {ChartDataSelect};