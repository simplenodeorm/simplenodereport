import React from 'react';
import "../app/App.css";

const loop = (data, cur) => {
    return data.map((info) => {
        let myStyle = {
            backgroundColor: info
        }
        return <div className="color" style={myStyle}></div>
    });
};


class ColorSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="combobox dropdown">
            <div tabIndex="-1" className="downarrow"></div>
            <div className="colorlist">{loop(this.props.colors, this.props.currentColor)}</div>
        </div>
    }
}

export {ColorSelect};