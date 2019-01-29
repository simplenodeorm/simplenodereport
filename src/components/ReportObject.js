import React from 'react';
import "../app/App.css";
import {getUniqueKey} from './helpers';
import config from '../config/appconfig';

class ReportObject extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            key: getUniqueKey(),
            left: this.props.config.rect.left,
            top: this.props.config.rect.top,
            width: this.props.config.rect.width,
            height: this.props.config.rect.height
        };
        
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.getObjectData = this.getObjectData.bind(this);
    }

    render() {
        const {left, top, width, height, key} = this.state;
        const objectData = this.getObjectData();
        this.loadCss(objectData);
        const myStyle = {
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px'
        };
        return <div
                key={key}
                style={myStyle}
                className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
    }

    getConfigValue(nm) {
        return config[nm];
    }

    getConfigText(nm) {
        return config.textmsg[nm];
    }

    hasBorder(settings) {
        return (settings.borderStyle !== 'none');
    }

    hasFullBorder(settings) {
        return (settings.left && settings.top && settings.right && settings.bottom);
    }

    buildBorderCss(prefix, settings) {
        return prefix + ': '
            + settings.borderStyle
            + ' '
            + settings.borderWidth
            + 'px '
            + settings.borderColor + ';';
    }

    getObjectData() {
    }

    getContent() {
        return <div/>;
    }

    loadCss() {
    }

    getCssClassName() {
        return (document.designData.reportName.replace(/ /g, '-') + '-' + this.props.config.objectType + '-' + this.props.config.id);
    }
    
    onLayoutChange(info) {
        this.setState({left: info.left, top: info.top, width: info.width, height: info.height});
    }
}

    
export {ReportObject};