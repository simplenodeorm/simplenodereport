import React from 'react';
import config from '../config/appconfig.json';
import {Checkbox} from './Checkbox';
import {SizeSelect} from './SizeSelect';
import {ColorSelect} from './ColorSelect';

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });};


class BorderSelectPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.getBorderSettings();

        this.setBorderStyle = this.setBorderStyle.bind(this);
        this.setBorderColor = this.setBorderColor.bind(this);
        this.setBorderWidth = this.setBorderWidth.bind(this);
        this.setLeft = this.setLeft.bind(this);
        this.setTop = this.setTop.bind(this);
        this.setRight = this.setRight.bind(this);
        this.setBottom = this.setBottom.bind(this);
    }

    render() {
        const {borderStyle, borderWidth, borderColor, left, top, right, bottom} = this.state;


        let exampleStyle;

        if (left || right || top || bottom) {
            exampleStyle = {
                height: '20px',
                marginLeft: '2px',
                marginTop: '3px'
            };

            if (left) {
                exampleStyle.borderLeft = borderStyle + ' ' + borderWidth + 'px ' + borderColor;
            }

            if (top) {
                exampleStyle.borderTop = borderStyle + ' ' + borderWidth + 'px ' + borderColor;
            }

            if (right) {
                exampleStyle.borderRight = borderStyle + ' ' + borderWidth + 'px ' + borderColor;
            }

            if (bottom) {
                exampleStyle.borderBottom = borderStyle + ' ' + borderWidth + 'px ' + borderColor;
            }
        } else {
            exampleStyle = {
                border: 'none'
            };
        }


        return <div className="fontSelect"><table cellspacing="0" cellpadding="0">
            <tr><td style={{textDecoration: "underline"}} colspan="2">{this.props.label}</td></tr>
            <tr><th>{config.textmsg.borderstylelabel}</th><td><select onChange={this.setBorderStyle}>{loop(config.borderStyles, borderStyle)}</select></td></tr>
            <tr><th>{config.textmsg.borderwidthlabel}</th><td><SizeSelect sizes={config.borderWidths} setSize={this.setBorderWidth} currentSize={borderWidth}/></td></tr>
            <tr><th>{config.textmsg.bordercolorlabel}</th><td><ColorSelect colors={config.borderColors} setColor={this.setBorderColor} currentColor={borderColor}/></td></tr>
            <tr>
                <td></td>
                <td>
                    <Checkbox label={config.textmsg.left} handleCheckboxChange={this.setLeft} isChecked={left}/>&nbsp;
                    <Checkbox label={config.textmsg.top} handleCheckboxChange={this.setTop} isChecked={top}/>
                </td>
            </tr>
            <tr><td></td>
                <td>
                    <Checkbox label={config.textmsg.right} handleCheckboxChange={this.setRight} isChecked={right}/>&nbsp;
                    <Checkbox label={config.textmsg.bottom} handleCheckboxChange={this.setBottom} isChecked={bottom}/>
                </td>
            </tr>
            <tr><th>{config.textmsg.examplelabel}</th><td><div style={exampleStyle}/></td></tr>
            </table></div>
    }

    setLeft(b) {
        this.setState({left: b});
        this.props.setBorderSettings('left', b);
    }

    setTop(b) {
        this.setState({top: b});
        this.props.setBorderSettings('top', b);
    }

    setRight(b) {
        this.setState({right: b});
        this.props.setBorderSettings('right', b);
    }

    setBottom(b) {
        this.setState({bottom: b});
        this.props.setBorderSettings('bottom', b);
    }

    setBorderStyle(e) {
        this.setState({borderStyle: e.target.options[e.target.selectedIndex].value});
        this.props.setBorderSettings('borderStyle', e.target.options[e.target.selectedIndex].value);
    }

    setBorderWidth(e) {
        this.setState({borderWidth: e.target.options[e.target.selectedIndex].value});
        this.props.setBorderSettings('borderWidth', e.target.options[e.target.selectedIndex].value);
    }

    setBorderColor(color) {
        this.setState({borderColor: color});
        this.props.setBorderSettings('borderColor', color);
    }
}

export {BorderSelectPanel};

