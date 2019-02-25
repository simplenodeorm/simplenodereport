import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import {copyObject, getModalContainer, formatDate, getTextRect} from "./helpers";
import ReactDOM from "react-dom";
import {CurrentDateSetupPanel} from "./CurrentDateSetupPanel";

class CurrentDateReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            format: this.props.config.format
        };
    }
    
    getContent(objectData) {
        return <span>{formatDate(new Date(), objectData.format)}</span>
    }
    
    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        
        this.addBaseReportObjectCss(style, objectData.cssClassName, this.props.config.textAlign);
        let fontStyle = 'normal';
        let textDecoration = 'none';
        
        if (this.props.config.fontSettings.italic) {
            fontStyle = 'italic';
        }
    
        if (this.props.config.fontSettings.underlined) {
            textDecoration = 'underline';
        }
    
        let css = '.' + objectData.cssClassName
            + ' span {margin: 0; padding: 0; font-family:'
            + this.props.config.fontSettings.font
            + '; font-size: '
            + this.props.config.fontSettings.fontSize
            + 'pt; font-weight: '
            + this.props.config.fontSettings.fontWeight
            + '; font-style: '
            + fontStyle
            + '; text-decoration: '
            + textDecoration
            + '; color: '
            + this.props.config.fontSettings.fontColor
            + '; background-color: '
            + this.props.config.fontSettings.backgroundColor
            + '; } ';
        
        style.appendChild(document.createTextNode(css));
        
        return style;
        
    }
    
    getDefaultRect() {
        let rc = getTextRect(this.props.config.fontSettings.font,
            this.props.config.fontSettings.fontSize, this.props.config.format);
        return {left: 20, top: 20, width: rc.width, height: rc.height};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 300, height: 375};
        let mc = getModalContainer(rc);
        ReactDOM.render(<CurrentDateSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
    
}

export {CurrentDateReportObject};

