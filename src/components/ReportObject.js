import React from 'react';
import "../app/App.css";
import {getUniqueKey,isResizeCursor,getResizeCursor} from './helpers';
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
        this.mouseDown = false;
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.getObjectData = this.getObjectData.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
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
            onMouseDown={this.onMouseDown}
             className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
    }
    
    onMouseOver(info) {
        if (!this.mouseDown) {
            let e = ReactDOM.findDOMNode(this);
            e.style.cursor = getResizeCursor(e.getBoundingClientRect(), info.clientX, info.clientY);
        }
    }
    
    onMouseDown(info) {
        if (info.button === 0) {
            let e = ReactDOM.findDOMNode(this);
            if (isResizeCursor(e.style.cursor)) {
                this.mouseDown = true;
                info.preventDefault();
            }
        }
    }

    onMouseUp(info) {
        this.mouseDown = false;
        let e = ReactDOM.findDOMNode(this);
        if (isResizeCursor(e.style.cursor)) {
            const {left, top, width, height} = this.state;
            let rc = e.getBoundingClientRect();
            let newLeft = info.clientX - rc.left;
            let newTop = info.clientY - rc.top;
            let newWidth = rc.width - newLeft;
            let newHeight = rc.height - newTop;
    
            switch (e.style.cursor) {
                case 'w-resize':
                    this.onLayoutChange({left: newLeft, top: top, width:newWidth, height:height});
                    break;
                case 'e-resize':
                    this.onLayoutChange({left: left, top: top, width: newWidth, height: height});
                    break;
                case 'n-resize':
                    this.onLayoutChange({left: left, top: newTop, width: width, height: newHeight});
                    break;
                case 's-resize':
                    this.onLayoutChange({left: left, top: top, width: width, height: newHeight});
                    break;
            }
        }
        info.target.style.cursor = '';
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