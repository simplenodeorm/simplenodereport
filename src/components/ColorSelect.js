/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import tinycolor from 'tinycolor2'

class ColorSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedColor: this.props.currentColor,
            displayList: false

        };

        this.setColor = this.setColor.bind(this);
        this.setDisplayList = this.setDisplayList.bind(this);
    }
    
    render() {
        const curobj = this;
        const loop = (data) => {
            return data.map((info) => {
                let myStyle = {
                    backgroundColor: info
                };

                return <button className="color" style={myStyle} onClick={curobj.setColor}/>
            });
        };

        const {displayList, selectedColor} = this.state;
        const myStyle = {
            backgroundColor: selectedColor
        };
        
        let colors = this.props.colors;
        
        if (!colors) {
            colors = config.colors;
        }
    
        colors.sort(function(a,b) {
            let c1 = tinycolor(a);
            let c2 = tinycolor(b);
            return (c1.toHslString() > c2.toHslString());
        });
        
        if (this.props.asSpan) {
            return <span style={myStyle} className="colorPicker">
                <img alt="display color list" src="/images/pie-chart.png" onClick={this.setDisplayList}/>
                {displayList && <div className="colorlist">{loop(colors)}</div>}
            </span>
        } else {
            return <div style={myStyle} className="colorPicker">
                <img alt="display color list" src="/images/pie-chart.png" onClick={this.setDisplayList}/>
                {displayList && <div className="colorlist">{loop(colors)}</div>}
            </div>
        }
    }

    setDisplayList() {
        const {displayList} = this.state;
        this.setState({displayList: !displayList});
    }

    setColor(e) {
        this.props.setColor(e.target.style.backgroundColor);
        this.setState({selectedColor: e.target.style.backgroundColor, displayList: false});
    }
}

export {ColorSelect};