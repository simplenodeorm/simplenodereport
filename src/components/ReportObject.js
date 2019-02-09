import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {Resizable} from './Resizable';

class ReportObject extends Resizable {
    constructor(props) {
        super(props);
        
        this.onClick = this.onClick.bind(this);
        this.getObjectData = this.getObjectData.bind(this);
        this.getContent = this.getContent.bind(this);
    }
    
    render() {
        if (this.props.config.removed) {
            return <span/>
        } else {
            const {left, top, width, height} = this.state;
            const objectData = this.getObjectData();
            
            this.loadCss(objectData);
            
            const content = this.getContent(objectData);
  
            const myStyle = {
                left: left + 'px',
                top: top + 'px',
                width: width + 'px',
                height: height + 'px',
            };
    
            if (this.props.config.selected) {
                myStyle.border = config.selectedObjectBorder;
            }
    
            return <div
                key={this.props.config.id}
                style={myStyle}
                onMouseOver={this.onMouseOver}
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                onClick={this.onClick}
                className={objectData.cssClassName}>{content}</div>
        }
    }
    
    componentWillUnmount() {
        document.removeEventListener ('mouseup', this.onMouseUp, true);
        document.removeEventListener ('mouseover', this.onMouseOver, true);
    }
    
    onClick(info) {
        if (info.ctrlKey) {
            this.props.config.selected = !this.props.config.selected;
            this.props.onObjectSelect(this.props.config.selected);
            this.setState(this.state);
            info.preventDefault();
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
        return (document.designData.currentReport.reportName.replace(/ /g, '-') + '-' + this.props.config.objectType + '-' + this.props.config.id);
    }
    
    addBaseReportObjectCss(style, className) {
        style.appendChild(document.createTextNode('.' + className
            + ' {position: relative; overflow: hidden; }'));
    
        style.appendChild(document.createTextNode('div.'
            + className + ':hover { border: ' + config.activeObjectBorder + ';}'));
    
    }
    
    remove() {
        this.props.config.removed = true;
        this.props.config.selected = false;
        this.setState(this.state);
    }
    
    isPageBreakRequired() {
        return false;
    }
}


export {ReportObject};