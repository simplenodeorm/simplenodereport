import React from 'react';
import ReactDOM from "react-dom";
import "../app/App.css";
import {getUniqueKey,isResizeCursor,isMoveCursor,getMoveResizeCursor,isPointInRect} from './helpers';
import config from '../config/appconfig';

class ReportObject extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            key: getUniqueKey(),
            left: this.props.config.rect.left,
            top: this.props.config.rect.top,
            width: this.props.config.rect.width,
            height: this.props.config.rect.height
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.getObjectData = this.getObjectData.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onClick = this.onClick.bind(this);
        this.selected = false;
    }
    
    render() {
        const {left, top, width, height, key} = this.state;
        const objectData = this.getObjectData();
        this.loadCss(objectData);
        
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
            key={key}
            style={myStyle}
            onMouseOver={this.onMouseOver}
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onClick={this.onClick}
            className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
    }
    
    onClick(info) {
        if (info.ctrlKey) {
            this.selected = this.props.config.selected = !this.props.config.selected;
            this.props.onObjectSelect(this.props.config.selected);
            this.setState(this.state);
            info.preventDefault();
        } else {
        
        }
    }
    
    onMouseOver(info) {
       if (!this.startInfo) {
            let rc = ReactDOM.findDOMNode(this).getBoundingClientRect();
            if (isPointInRect(info.clientX, info.clientY, rc)) {
                document.body.style.cursor = getMoveResizeCursor(rc, info.clientX, info.clientY);
            } else {
                document.body.style.cursor = '';
            }
        } else {
            document.body.style.cursor = this.startInfo.cursor;
        }
    }
    
    onMouseDown(info) {
        if (info.button === 0) {
           if (isResizeCursor(document.body.style.cursor) || isMoveCursor(document.body.style.cursor)) {
               document.addEventListener ('mouseup', this.onMouseUp, true);
               document.addEventListener ('mouseover', this.onMouseOver, true);
               this.startInfo = { x: info.screenX, y: info.screenY, cursor: document.body.style.cursor};
               info.preventDefault();
            }
        }
    }

    onMouseUp(info) {
        if (this.startInfo) {
            document.removeEventListener('mouseup', this.onMouseUp, true);
            document.removeEventListener('mouseover', this.onMouseOver, true);
            const {left, top, width, height} = this.state;
            let newLeft = left + (info.screenX - this.startInfo.x);
            let newTop = top + (info.screenY - this.startInfo.y);
            if (isResizeCursor(document.body.style.cursor)) {
               switch (document.body.style.cursor) {
                    case 'w-resize':
                        this.onLayoutChange({left: newLeft, top: top, width: width - newLeft, height: height});
                        break;
                    case 'e-resize':
                        this.onLayoutChange({
                            left: left,
                            top: top,
                            width: width + (info.screenX - this.startInfo.x),
                            height: height
                        });
                        break;
                    case 'n-resize':
                        this.onLayoutChange({left: left, top: newTop, width: width, height: height - newTop});
                        break;
                    case 's-resize':
                        this.onLayoutChange({
                            left: left,
                            top: top,
                            width: width,
                            height: height + (info.screenY - this.startInfo.y)
                        });
                        break;
                }
            } else if (isMoveCursor(document.body.style.cursor)) {
                this.onLayoutChange({
                    left: newLeft,
                    top: newTop,
                    width: width,
                    height: height
                });
            }
    
            info.preventDefault();
            document.body.style.cursor = '';
            this.startInfo = '';
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
        return (document.designData.reportName.replace(/ /g, '-') + '-' + this.props.config.objectType + '-' + this.props.config.id);
    }
    
    onLayoutChange(info) {
        let newLeft = Math.max(3, info.left);
        let newTop = Math.max(3, info.top)
        let newWidth = info.width;
        let newHeight = info.height;
    
        if (this.props.boundingRect.width < (newLeft + newWidth)) {
            newWidth -= ((newLeft + newWidth) - this.props.boundingRect.width);
        }
    
        if (this.props.boundingRect.height < (newTop + newHeight)) {
            newHeight -= ((newTop + newHeight) - this.props.boundingRect.height);
        }
    
        let rc = {
            left: newLeft,
            top:  newTop,
            width: newWidth,
            height: newHeight
        };
        
        this.props.config.rect = rc;
        this.setState(rc);
    }
    
    addBaseReportObjectCss(style, className) {
        style.appendChild(document.createTextNode('.' + className
            + ' {position: relative; overflow: hidden; }'));
    
        style.appendChild(document.createTextNode('div.'
            + className + ':hover { border: ' + config.activeObjectBorder + ';}'));
    
    }
}

    
export {ReportObject};