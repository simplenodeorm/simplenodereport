import React from 'react';
import '../app/App.css';
import {ReportObject} from "./ReportObject";
import {copyObject, getModalContainer} from "./helpers";
import ReactDOM from "react-dom";
import {ImageSetupPanel} from "./ImageSetupPanel";

class ImageReportObject extends ReportObject {
    constructor(props) {
        super(props);
    }
    
    getObjectData() {
        return {
            cssClassName: this.getCssClassName(),
            url: this.props.config.url,
            altText: this.props.config.altText,
            sizeToContent: false
        };
    }
    
    getContent(objectData) {
        if (!this.props.config.sizeToContent) {
            return <img style={{width: "100%", height: "100%"}} src={objectData.url} alt={objectData.altText}/>;
        } else {
            return <img src={objectData.url} alt={objectData.altText}/>;
        }
    }
    
    getCssStyle(objectData) {
        let style = document.createElement('style');
        style.id = objectData.cssClassName;
        
        this.addBaseReportObjectCss(style, objectData.cssClassName);

        return style;
        
    }
    
    getDefaultRect() {
        return {top: 20, left: 20, height: 100, width: 100};
    }
    
    onEdit(info) {
        let rc = {left: 175, top: 50, width: 350, height: 200};
        let mc = getModalContainer(rc);
        ReactDOM.render(<ImageSetupPanel
            onOk={this.updateReportObject}
            reportObject={copyObject(this.props.config)}/>, mc);
        
    }
    
}

export {ImageReportObject};

