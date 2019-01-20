import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

class TextAlignSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setTextAlign = this.setTextAlign.bind(this);
    }
    
    setLocation(textAlign) {
        this.setState({textAlign: textAlign});
    }

    render() {
        return <div className="textAlignSelect">{config.textmsg.textalignlabel}
            <select onChange={this.setTextAlign}>
                <option value="left">{config.textmsg.left}</option>
                <option value="center">{config.textmsg.center}</option>
                <option value="right">{config.textmsg.right}</option>
            </select>
        </div>;
    }

    setTextAlign(e) {
        this.props.setTextAlign(e.target.options[e.target.selectedIndex].value);
    }
}

export {TextAlignSelect};