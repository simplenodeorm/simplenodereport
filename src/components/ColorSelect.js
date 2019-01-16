import React from 'react';
import "../app/App.css";

const loop = (data, cur) => {
    return data.map((info) => {
        const myStyle = {
            background: '"' + info + '"',
            width: "30px"
        }

        if (cur && (info === cur)) {
            return <option value={info} style={myStyle} selected></option>;
        } else {
            return <option value={info} style={myStyle}></option>;
        }
    });};


class ColorSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <select onChange={this.props.setColor}>{loop(this.props.colors, this.props.currentColor)}</select>;
    }
}

export {ColorSelect};