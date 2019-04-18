import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const loop = (data) => {
    return data.map((info) => {
        if (!info.axis) {
            return <option value={info.path}>{info.path.replace(/\./g, '->')}</option>;
        } else if (info.axis === 'category') {
            return <option value={info.path} selected>{info.path.replace(/\./g, '->')}</option>;
        }
    });
};

class ChartCategorySelect extends React.Component{
    constructor(props) {
        super(props);
        
        this.setCategoryAxis = this.setCategoryAxis.bind(this);
    }
    
    render() {
        return <div>{config.textmsg.categorylabel}
            <select onChange={this.setCategoryAxis}><option/>
                {loop(this.props.reportColumns)}
            </select>
        </div>;
    }
    
    setCategoryAxis(e) {
        let val = e.target.options[e.target.selectedIndex].value;
        for (let i = 0; i < this.props.reportColumns.length; ++i) {
            if (this.props.reportColumns[i].path === val) {
                this.props.reportColumns[i].axis = 'category';
            } else if (this.props.reportColumns[i].axis === 'category') {
                this.props.reportColumns[i].axis = '';
            }
        }
        
        this.props.categoryChanged(val);
    }
}

export {ChartCategorySelect};