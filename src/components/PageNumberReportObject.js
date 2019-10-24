/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import {copyObject, getModalContainer, getTextRect} from "./helpers";
import ReactDOM from "react-dom";
import {PageNumberSetupPanel} from "./PageNumberSetupPanel";
import config from '../config/appconfig';

class PageNumberReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            format: this.props.config.format,
            location: this.props.config.location
        };
    }
    
    getContent(objectData) {
        return <span>{this.props.config.format.replace('?', '1')}</span>
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
            + ' span {width: 100%; height: 100%; margin: 0; padding: 0; font-family:'
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
    
    getOverflowType() {
        return 'visible';
    }
    
    getDefaultRect() {
        let retval;
        let rc = getTextRect(this.props.config.fontSettings.font,
            this.props.config.fontSettings.fontSize, this.props.config.format);
        switch(this.props.config.location) {
            case 'tl':
                retval = {left: -rc.width/2, top: -config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
            case 'tm':
                retval = {left: ((this.props.boundingRect.width - rc.width)/2), top: -config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
            case 'tr':
                retval = {left: (this.props.boundingRect.width -rc.width/2), top: -config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
            case 'bl':
                retval = {left: -rc.width/2, top: this.props.boundingRect.height + config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
            case 'bm':
                retval = {left: ((this.props.boundingRect.width - rc.width)/2), top: this.props.boundingRect.height + config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
            case 'br':
                retval = {left: (this.props.boundingRect.width -rc.width/2), top: this.props.boundingRect.height + config.pageNumberPadding, width: rc.width, height: rc.height};
                break;
        }
        
        return retval;
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 300, height: 375};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PageNumberSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
    
}

export {PageNumberReportObject};

