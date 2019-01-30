import React from 'react';
import "../app/App.css";
import {getUniqueKey,getResizeCursor} from './helpers';
import config from '../config/appconfig';
import ReactDOM from "react-dom";

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
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
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
            onMouseOver={this.onMouseOver}
            onMouseUp={this.onMouseUp}
             className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
    }
    
    onMouseOver(info) {
        info.target.style.cursor = getResizeCursor(ReactDOM.findDOMNode(this).getBoundingClientRect(), info.clientX, info.clientY);
    }
    
    onMouseUp(info) {
        if (info.target.style.cursor) {
            let rc = ReactDOM.findDOMNode(this).getBoundingClientRect();
           
            switch(info.target.style.cursor) {
                case 'e-resize':
                    this.onLayoutChange({left: info.clientX})
                    break;
                case 'w-resize':
                    this.onLayoutChange({width: info.clientX - rc.left})
                    break;
                case 'n-resize':
                    this.onLayoutChange({top: info.clientY})
                    break;
                case 's-resize':
                    this.onLayoutChange({height: info.clientY - rc.top})
                    break;
            }
            info.target.style.cursor = '';
        }
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
        this.setState(info);
    }
}

    
export {ReportObject};