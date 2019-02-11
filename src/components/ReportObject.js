import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {Resizable} from './Resizable';
import {getContextMenu} from "./helpers";
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
    
    getCssStyle() {
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
    
    onContextMenu(info) {
        info.preventDefault();
        const cm = getContextMenu(info);
        ReactDOM.render(<ul><li><button onClick={this.onEdit}>{config.textmsg.editreportobject}</button></li><li><button onClick={this.onDelete}>{config.textmsg.deletereportobject}</button></li></ul>, cm);
    }
    
    onEdit(info) {
    
    }
    
    onDelete(info) {
    
    }
}


export {ReportObject};