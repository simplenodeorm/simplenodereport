/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import config from "../config/appconfig";
import "../app/App.css";

const loop = (data, curshape) => {
    return data.map((info) => {
        if (curshape && (info === curshape)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });
};

class ShapeSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.asTableRow) {
            return <tr>
                <th>{config.textmsg.shapelabel}</th>
                <td><select onChange={this.props.setShape}>
                    {loop(config.shapes, this.props.currentShape)}</select></td>
            </tr>;
        } else {
            return <select onChange={this.props.setShape}>{loop(config.shapes, this.props.currentShape)}</select>;
        }
    }
}

export {ShapeSelect};