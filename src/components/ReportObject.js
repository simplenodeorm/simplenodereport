/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {Resizable} from './Resizable';
import {clearContextMenu, getContextMenu,getPixelsPerInch} from "./helpers";
import ReactDOM from "react-dom";

class ReportObject extends Resizable {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.getObjectData = this.getObjectData.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getCssStyle = this.getCssStyle.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateReportObject = this.updateReportObject.bind(this);
        this.onBringToFront = this.onBringToFront.bind(this);
        this.onSendToBack = this.onSendToBack.bind(this);
    }
    
    componentDidMount() {
        this.props.setMountedComponent(this);
    }
    
    render() {
        if (this.props.config.removed) {
            return <span />
        } else {
            const {left, top, width, height} = this.state;
            
            let objectData = this.getObjectData();
    
            let newStyle = this.getCssStyle(objectData);
            
            // remove style if it exists so we can update
            if (newStyle) {
                let style = document.getElementById(objectData.cssClassName);
                if (style) {
                    style.parentNode.removeChild(style);
                }
    
                document.body.appendChild(newStyle);
            }
            
            this.props.config.style = newStyle.innerHTML;
            
            const content = this.getContent(objectData);
  
            const myStyle = {
                position: "absolute",
                left: left + 'px',
                top: top + 'px',
                width: width + 'px',
                height: height + 'px',
                zIndex: this.getZIndex(),
                opacity: this.getOpacity()
            };
    
            if (this.props.config.objectType === 'label') {
                myStyle.border = config.labelBorder;
            }
            if (this.props.config.selected) {
                myStyle.border = config.selectedObjectBorder;
            }
    
            return <div
                key={this.props.config.id}
                style={myStyle}
                onMouseOver={this.onMouseOver}
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
                onContextMenu={this.onContextMenu}
                className={objectData.cssClassName}>{content}</div>
        }
    }
    
    componentWillUnmount() {
        document.removeEventListener ('mouseup', this.onMouseUp, true);
        document.removeEventListener ('mouseover', this.onMouseOver, true);
    }
    
    onClick(info) {
        if (!this.isContextMenu(info) && info.ctrlKey) {
            this.props.config.selected = !this.props.config.selected;
            this.props.onObjectSelect(this.props.config);
            this.setState(this.state);
            info.preventDefault();
        }
    }
    
    getOpacity() {
        return 1;
    }
    
    getConfigValue(nm) {
        return config[nm];
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
            + (settings.borderWidth/getPixelsPerInch()).toFixed(3)
            + 'in '
            + settings.borderColor + ';';
    }
    
    getObjectData() {
    }
    
    getContent() {
        return <div/>;
    }
    
    getCssStyle() {
    }
    
    getCssClassName() {
        return ('rpt-' + this.props.config.objectType.replace(/ /g, '-')
            + '-' + this.props.config.id);
    }
    
    getOverflowType() {
        return 'hidden';
    }
    
    addBaseReportObjectCss(style, className, textAlign) {
        let ta = '';
        
        if (textAlign) {
            ta = ' text-align: ' + textAlign + '; ';
        }
        
        style.appendChild(document.createTextNode('.' + className
            + ' {position: absolute; overflow: '
            + this.getOverflowType()
            +'; '
            + ta
            + this.getCustomCssFragment()
            + '} '));
        style.appendChild(document.createTextNode(' div.'
            + className + ':hover { border: ' + config.activeObjectBorder + ';} '));
    
    }
    
    getZIndex() {
        let zIndex = 0;
        if (this.props.config.zIndex) {
            zIndex = this.props.config.zIndex;
        }
        return zIndex;
    }
    
    getCustomCssFragment() {
        return '';
    }
    
    remove() {
        this.props.config.removed = true;
        this.props.config.selected = false;
        this.setState(this.state);
    }
    
    onContextMenu(info) {
        info.preventDefault();
        const cm = getContextMenu(info);
        ReactDOM.render(<ul>
            <li><button onClick={this.onEdit}>{config.textmsg.editreportobject}</button></li>
            <li><button onClick={this.onBringToFront}>{config.textmsg.bringtofront}</button></li>
            <li><button onClick={this.onSendToBack}>{config.textmsg.sendtoback}</button></li>
            <li><hr /></li>
            <li><button onClick={this.onDelete}>{config.textmsg.deletereportobject}</button></li>
            </ul>, cm);
    }
    
    onEdit(info) {
    }
    
    onBringToFront() {
        this.props.config.zIndex = 100;
        clearContextMenu();
        this.setState(this.state);
    }
    
    onSendToBack() {
        this.props.config.zIndex = -100;
        clearContextMenu();
        this.setState(this.state);
    }
    
    updateReportObject(reportObject) {
        for (let key in reportObject) {
            this.props.config[key] = reportObject[key];
        }
        
        this.setState(this.state);
    }
    
    onDelete() {
        if (window.confirm(config.textmsg.deleteoreportbjectprompt)) {
            this.remove();
        }
    }
}


export {ReportObject};