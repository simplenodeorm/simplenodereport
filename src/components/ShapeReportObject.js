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
    
    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        
        let css = '.' + objectData.cssClassName
            + ' { background: transparent; position: absolute; z-index:-1;  ';
    
        if (this.props.config.borderSettings.shape !== 'line') {
            css += this.buildBorderCss('border', this.props.config.borderSettings);
        } else {
            css += this.buildBorderCss('border-top', this.props.config.borderSettings);
        }
        
        css += '}';
    
        style.appendChild(document.createTextNode(css));

        style.appendChild(document.createTextNode('div.'
            + objectData.cssClassName
            + ':hover { border: ' + config.activeObjectBorder + ';}'));
    
        return style;
        
    }
    
    getDefaultRect() {
        return {top: 20, left: 20, height: 100, width: 100};
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

