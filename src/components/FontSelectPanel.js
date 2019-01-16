import React from 'react';
import config from '../config/appconfig.json';
import {Checkbox} from './Checkbox';
import {SizeSelect} from './SizeSelect';
import {ColorSelect} from "./ColorSelect";

const loop = (data, cur) => {
    return data.map((info) => {
        if (cur && (info === cur)) {
            return <option value={info} selected>{info}</option>;
        } else {
            return <option value={info}>{info}</option>;
        }
    });};

class FontSelectPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.getFontSettings();

        this.setItalic = this.setItalic.bind(this);
        this.setUnderlined= this.setUnderlined.bind(this);
        this.setFont = this.setFont.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setFontColor = this.setFontColor.bind(this);
        this.setFontWeight = this.setFontWeight.bind(this);
    }

    render() {
        const {font, fontSize, fontWeight, fontColor, italic, underlined} = this.state;

        let exampleStyle = {
            fontFamily: font,
            fontWeight: fontWeight,
            fontSize: Math.round((fontSize * config.zoomFactor)) + 'px',
            border: "solid gray 1px",
            height: "40px",
            verticalAlign: "middle",
            textAlign: "center"

        };

        if (italic) {
            exampleStyle.fontStyle = 'italic';
        } else {
            exampleStyle.fontStyle = 'normal';
        }

        if (underlined) {
            exampleStyle.textDecoration = 'underline';
        } else {
            exampleStyle.textDecoration = 'none';
        }


        return <div className="fontSelect"><table cellspacing="0" cellpadding="0">
            <tr><td style={{textDecoration: "underline"}} colspan="2">{this.props.label}</td></tr>
            <tr><th>{config.textmsg.namelabel}</th><td><select onChange={this.setFont}>{loop(config.fonts, font)}</select></td></tr>
            <tr><th>{config.textmsg.sizelabel}</th><td><SizeSelect sizes={config.fontSizes} setSize={this.setFontSize} currentSize={fontSize}/></td></tr>
            <tr><th>{config.textmsg.weightlabel}</th><td><select onChange={this.setFontWeight}>{loop(config.fontWeights, fontWeight)}</select></td></tr>
            <tr><th>{config.textmsg.colorlabel}</th><td><ColorSelect colors={config.fontColors} setColor={this.setFontColor} currentColor={fontColor}/></td></tr>
            <tr><td></td><td><Checkbox label={config.textmsg.italic} handleCheckboxChange={this.setItalic} isChecked={italic}/>&nbsp;
                <Checkbox label={config.textmsg.underlined} handleCheckboxChange={this.setUnderlined} isChecked={underlined}/></td></tr>
            <tr><td colspan="2"><div style={exampleStyle}>example text</div></td></tr>
            </table></div>
    }

    setItalic(italic) {
        this.setState({italic: italic});
        this.props.setFontSetting('italic', italic);
    }

    setUnderlined(underlined) {
        this.setState({underlined: underlined});
        this.props.setFontSettings('underlined', underlined);
    }

    setFont(e) {
        this.setState({font: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('font', e.target.options[e.target.selectedIndex].value);
    }

    setFontSize(e) {
        this.setState({fontSize: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('fontSize', e.target.options[e.target.selectedIndex].value);
    }

    setFontColor(e) {
        this.setState({fontColor: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('fontColor', e.target.options[e.target.selectedIndex].value);
    }

    setFontWeight(e) {
        this.setState({fontWeight: e.target.options[e.target.selectedIndex].value});
        this.props.setFontSettings('fontWeight', e.target.options[e.target.selectedIndex].value);
    }
}

export {FontSelectPanel};

