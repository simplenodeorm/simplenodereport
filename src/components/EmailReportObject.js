/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import {copyObject, getModalContainer} from "./helpers";
import ReactDOM from "react-dom";
import {EmailSetupPanel} from "./EmailSetupPanel";

class EmailReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            email: this.props.config.email,
            emailText: this.props.config.emailText
        };
    }
    
    getContent(objectData) {
        let href = 'mailto:' + objectData.email;
        if (objectData.emailText) {
            return <a href={href}>{objectData.emailText}</a>;
        } else {
            return <a href={href}>{objectData.email}</a>;
        }
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
            + ' a {cursor: pointer; font-family:'
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
            + ';} ';
        
        style.appendChild(document.createTextNode(css));
        return style;
        
    }
    
    getDefaultRect() {
        return {top: 20, left: 20, height: 20, width: 100};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 375, height: 450};
        let mc = getModalContainer(rc);
        ReactDOM.render(<EmailSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
    
}

export {EmailReportObject};

