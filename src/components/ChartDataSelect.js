import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import {ChartDataAxisLine} from './ChartDataAxisLine';

const selectLoop = (data) => {
    return data.map((info) => {
        if (info.isNumeric) {
            if (info.axis === 'data') {
                return <option value={info.path} selected>{info.path.replace(/\./g, '->')}</option>;
            } else if (!info.axis) {
                return <option value={info.path}>{info.path.replace(/\./g, '->')}</option>;
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
        
        this.state = {
            update: false
        }
    }
    
    render() {
        const dataIndexLoop = (data) => {
            return data.map((info) => {
                if (info.axis === 'data') {
                    return <ChartDataAxisLine updateDataAxis={this.updateDataAxis} chartType={this.props.chartType} reportColumn={info}/>
                }
            });
        };
        let catSelected = this.categorySelected();
        return <div className={'chartDataSelect'}>{config.textmsg.datalabel}&nbsp;
            {(this.currentColumn && catSelected) &&
            <img alt="add data axis" src="/images/add.png"  onClick={this.addDataAxis}/>}
            {(!this.currentColumn || !catSelected) &&
                <img alt="add data axis" src="/images/adddisabled.png"/>}
            <select onChange={this.setCurrentColumn} disabled={!catSelected}><option/>{selectLoop(this.props.reportColumns)}</select>
            
        <div className={'dataAxisContainer'}>
            {dataIndexLoop(this.props.reportColumns)}
        </div></div>
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
        this.setState(this.state);
    }
    
    addDataAxis() {
        this.currentColumn.axis = 'data';
        this.setState(this.state);
    }
    
    setCurrentColumn(e) {
        let path = e.target.options[e.target.selectedIndex].value;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if (path === this.props.reportColumns[i]) {
                this.currentColumn = this.props.reportColumns[i];
                this.setState(this.state);
                break;
            }
        }
    }
}

export {ChartDataSelect};