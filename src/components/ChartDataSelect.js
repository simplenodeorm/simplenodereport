import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ChartDataAxisLine} from './ChartDataAxisLine';
import {allowMultipleChartDataAxis} from './helpers';

const selectLoop = (data) => {
    return data.map((info) => {
        if (info.isNumeric) {
            let display;
            if (info.function) {
                display = info.function + '(' + info.path.replace(/\./g, '->') + ')';
            } else {
                display = info.path.replace(/\./g, '->')
            }
            if (!info.axis) {
                return <option value={info.path}>{display}</option>;
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
            {config.textmsg.datalabel}
            {this.getSelectionContent()}
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
                return <span>&nbsp;<img alt="add data axis" src="/images/add.png" onClick={this.addDataAxis}/>
                    <select onChange={this.setCurrentColumn}><option/>{selectLoop(this.props.reportColumns)}</select></span>
            } else {
                return <span>&nbsp;<img alt="add data axis" src="/images/adddisabled.png"/>
                    <select onChange={this.setCurrentColumn}><option/>{selectLoop(this.props.reportColumns)}</select></span>
    
            }
        } else {
            return <span>&nbsp;<img alt="add data axis" src="/images/adddisabled.png" /><select/></span>
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