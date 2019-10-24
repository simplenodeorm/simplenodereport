/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import config from '../config/appconfig';
import {copyObject, getModalContainer, getTextRect} from "./helpers";
import ReactDOM from "react-dom";
import {LabelSetupPanel} from "./LabelSetupPanel";

class LabelReportObject extends ReportObject {
    constructor(props) {
        super(props);
        if (!this.props.config.labelText) {
            this.props.config.labelText = config.textmsg.defaultreportlabeltext
        }
        
        
        if (!this.props.config.rect) {
            let rc = getTextRect(this.props.config.fontSettings.font,
                this.props.config.fontSettings.fontSize, this.props.config.labelText);
            this.props.config.rect = {left: 20, top: 20, width: rc.width, height: rc.height};
        }
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            labelText: this.props.config.labelText
        };
    }
    
    getContent(objectData) {
        return <div>{objectData.labelText}</div>;
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
            + ' div {width: 100%; height: 100%; margin: 0; padding: 0; font-family:'
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
        return {top: 20, left: 20, height: 20, width: 150};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 300, height: 375};
        let mc = getModalContainer(rc);
        ReactDOM.render(<LabelSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
    
}

export {LabelReportObject};

