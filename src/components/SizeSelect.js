import React from 'react';
import "../app/App.css";

const loop = (data, cursize) => {
    return data.map((info) => {
        if (cursize && (info == cursize)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });
};

class SizeSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <select onChange={this.props.setSize}>{loop(this.props.sizes, this.props.currentSize)}</select>;
    }
}

export {SizeSelect};