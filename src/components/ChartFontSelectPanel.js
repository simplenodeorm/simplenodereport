/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import config from '../config/appconfig.json';
import {Checkbox} from './Checkbox';
import {SizeSelect} from './SizeSelect';
import {ColorSelect} from "./ColorSelect";
import {ChartTitlePositionSelect} from './ChartTitlePositionSelect';

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });};

class ChartFontSelectPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.getFontSettings();
        this.setItalic = this.setItalic.bind(this);
        this.setFont = this.setFont.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setFontColor = this.setFontColor.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
    }

    render() {
        const {font, fontSize, fontColor, italic, display, position} = this.state;

        let exampleStyle = {
            fontFamily: font,
            color: fontColor,
            fontSize: Math.round((fontSize * config.zoomFactor)) + 'px',
            border: "solid gray 1px",
            height: "50px",
            width: "200px",
            marginLeft: '20px',
            verticalAlign: "middle",
            textAlign: "center",
            overflow:"hidden"

        };

        if (italic) {
            exampleStyle.fontStyle = 'italic';
        } else {
            exampleStyle.fontStyle = 'normal';
        }

        return <div className="dataEntry"><table cellSpacing="0" cellPadding="0">
            <tr><td /><td><Checkbox label={config.textmsg.display} handleCheckboxChange={this.setDisplay} isChecked={display}/></td></tr>
            <tr><th>{config.textmsg.positionlabel}</th><td><ChartTitlePositionSelect setPosition={this.setPosition} currentPosition={position}/></td></tr>
            <tr><th>{config.textmsg.namelabel}</th><td><select onChange={this.setFont}>{loop(config.fonts, font)}</select></td></tr>
            <tr><th>{config.textmsg.sizelabel}</th><td><SizeSelect sizes={config.fontSizes} setSize={this.setFontSize} currentSize={fontSize}/></td></tr>
            <tr><th>{config.textmsg.fontcolorlabel}</th><td><ColorSelect colors={config.colors} setColor={this.setFontColor} currentColor={fontColor}/></td></tr>
            <tr><td /><td><Checkbox label={config.textmsg.italic} handleCheckboxChange={this.setItalic} isChecked={italic}/></td></tr>
            </table></div>
    }

    setDisplay(display) {
        this.setState({display: display});
        this.props.setFontSettings('display', display);
    }


    setItalic(italic) {
        this.setState({italic: italic});
        this.props.setFontSettings('italic', italic);
    }

    setFont(e) {
        this.setState({font: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('font', e.target.options[e.target.selectedIndex].value);
    }

    setFontSize(e) {
        this.setState({fontSize: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('fontSize', e.target.options[e.target.selectedIndex].value);
    }

    setFontColor(color) {
        this.setState({fontColor: color});
        this.props.setFontSettings('fontColor', color);
    }

    setPosition(e) {
        let position = e.target.options[e.target.selectedIndex].value;
        this.setState({position: position});
        this.props.setFontSettings('position', position);
    }
}

export {ChartFontSelectPanel};

