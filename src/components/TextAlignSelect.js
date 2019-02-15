import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';

const loop = (data, ta) => {
    return data.map((info) => {
        if (ta === info) {
            return <option value={info} selected>{config.textmsg[info]}</option>;
        } else {
            return <option value={info}>{config.textmsg[info]}</option>;
        }
    });
};

class TextAlignSelect extends React.Component{
    constructor(props) {
        super(props);
        this.setTextAlign = this.setTextAlign.bind(this);
    }
    
    render() {
        const alignments = ["left", "center", "right"];
        if (this.props.asTableRow) {
            return <tr><th>{config.textmsg.textalignlabel}
            </th><td><select onChange={this.setTextAlign}>
                    {loop(alignments, this.props.textAlign)}
            </select></td>
            </tr>;
            
        } else {
            return <div className="textAlignSelect">{config.textmsg.textalignlabel}
                <select onChange={this.setTextAlign}>
                    {loop(alignments, this.props.textAlign)}
                </select>
            </div>;
        }
    }

    setTextAlign(e) {
        this.props.setTextAlign(e.target.options[e.target.selectedIndex].value);
    }
}

export {TextAlignSelect};