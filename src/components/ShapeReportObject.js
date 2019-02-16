import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import config from '../config/appconfig';
import {copyObject, getModalContainer} from "./helpers";
import ReactDOM from "react-dom";
import {ShapeSetupPanel} from "./ShapeSetupPanel";

class ShapeReportObject extends ReportObject {
    constructor(props) {
        super(props);
        if (!this.props.config.shape) {
            this.props.config.shape = config.defaultShape;
        }
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            shape: this.props.config.shape
        };
    }
    
    getContent(objectData) {
        return '';
    }
    
    getCustomCssFragment() {
        let retval = ' background: transparent; z-index:-1; ';
    
        if (this.props.config.shape !== 'line') {
            retval += this.buildBorderCss('border', this.props.config.borderSettings);
        } else {
            retval += this.buildBorderCss('border-top', this.props.config.borderSettings);
        }
    
        if (this.props.config.shape === 'ellipse') {
            retval += (' border-radius:' + (this.props.config.rect.width / 2) + 'px'
                + '/' + (this.props.config.rect.height / 2) + 'px; ')
        }
    
        return retval;
    }

    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        this.addBaseReportObjectCss(style, objectData.cssClassName);
        return style;
    }
    
    getDefaultRect() {
        if (this.props.config.shape !== 'line') {
            return {top: 20, left: 20, height: 100, width: 100};
        } else {
            return {top: 20, left: 20, height: 10, width: 100};
        }
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 275, height: 300};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ShapeSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
}

export {ShapeReportObject};

