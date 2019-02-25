import React from 'react';
import ReactDOM from "react-dom";
import {isPointInRect} from "./helpers";
import config from "../config/appconfig";

class Resizable extends React.Component {
    constructor(props) {
        super(props);
        
        let rc = this.props.config.rect;
        
        if (!rc || !this.props.config.rect.height) {
            this.props.config.rect = rc = this.getDefaultRect();
        }
        
        this.state = {
            left: rc.left,
            top: rc.top,
            width: rc.width,
            height: rc.height
        };
        
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.getMoveResizeCursor = this.getMoveResizeCursor.bind(this);
        this.isMoveCursor = this.isMoveCursor.bind(this);
        this.isResizeCursor = this.isResizeCursor.bind(this);
        this.handleCustomResize = this.handleCustomResize.bind(this);
        this.isCustomResizeCursor = this.isCustomResizeCursor.bind(this);
        this.getCustomResizeCursor = this.getCustomResizeCursor.bind(this);
        this.getCustomData = this.getCustomData.bind(this);
        this.isContextMenu = this.isContextMenu.bind(this);
    }
    
    onMouseOver(info) {
        document.body.style.cursor = '';
        if (!this.startInfo) {
            let node = ReactDOM.findDOMNode(this);
            let rc = node.getBoundingClientRect();
            if (isPointInRect(info.clientX, info.clientY, rc)) {
                document.body.style.cursor = this.getMoveResizeCursor(rc, info.clientX, info.clientY);
            } else {
                document.body.style.cursor = '';
            }
        } else {
            document.body.style.cursor = this.startInfo.cursor;
        }
    }
    
    onMouseLeave() {
        if (!this.startInfo) {
            document.body.style.cursor = '';
        }
    }
    
    isContextMenu(info) {
        return (info.type === 'contextmenu');
    }
    
    onMouseDown(info) {
        if (!this.isContextMenu(info)) {
            if (info.button === 0) {
                if (this.isResizeCursor(document.body.style.cursor)
                    || this.isMoveCursor(document.body.style.cursor)
                    || this.isCustomResizeCursor(document.body.style.cursor)) {
                    document.addEventListener('mouseup', this.onMouseUp, true);
                    document.addEventListener('mouseover', this.onMouseOver, true);
            
                    this.startInfo = {
                        x: info.screenX,
                        y: info.screenY,
                        clientX: info.clientX,
                        clientY: info.clientY,
                        customData: this.getCustomData(info.clientX, info.clientY, info.screenX, info.screenY),
                        cursor: document.body.style.cursor
                    };
                    info.preventDefault();
                }
            }
        }
    }
    
    onMouseUp(info) {
        if (!this.isContextMenu(info)) {
            if (this.startInfo) {
                document.removeEventListener('mouseup', this.onMouseUp, true);
                document.removeEventListener('mouseover', this.onMouseOver, true);
                const {left, top, width, height} = this.state;
                let newLeft = left + (info.screenX - this.startInfo.x);
                let newTop = top + (info.screenY - this.startInfo.y);
                if (this.isCustomResizeCursor(document.body.style.cursor)) {
                    this.handleCustomResize(info);
                } else if (this.isResizeCursor(document.body.style.cursor)) {
                    switch (document.body.style.cursor) {
                        case 'w-resize':
                            this.onLayoutChange({
                                left: newLeft,
                                top: top,
                                width: width + (left - newLeft),
                                height: height
                            });
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
                            this.onLayoutChange({
                                left: left, top: newTop,
                                width: width, height: height + (top - newTop)
                            });
                            break;
                        case 's-resize':
                            this.onLayoutChange({
                                left: left,
                                top: top,
                                width: width,
                                height: height + (info.screenY - this.startInfo.y)
                            });
                            break;
                        case 'se-resize':
                            this.onLayoutChange({
                                left: left,
                                top: top,
                                width: width + (info.screenX - this.startInfo.x),
                                height: height + (info.screenY - this.startInfo.y)
                            });
                            break;
                        case 'sw-resize':
                            this.onLayoutChange({
                                left: newLeft,
                                top: top,
                                width: width + newLeft,
                                height: height + (info.screenY - this.startInfo.y)
                            });
                    break;
                    }
                } else if (this.isMoveCursor(document.body.style.cursor)) {
                    this.onLayoutChange({
                        left: newLeft,
                        top: newTop,
                        width: width,
                        height: height
                    });
                }
            
                document.body.style.cursor = '';
                this.startInfo = '';
                info.preventDefault();
            }
        }
    }
    
    onLayoutChange(info) {
        let newLeft = Math.max(3, info.left);
        let newTop = Math.max(3, info.top);
        let newWidth = info.width;
        let newHeight = info.height;
        
        if (this.props.boundingRect) {
            if (this.props.boundingRect.width < (newLeft + newWidth)) {
                newWidth -= ((newLeft + newWidth) - this.props.boundingRect.width);
            }
            
            if (this.props.boundingRect.height < (newTop + newHeight)) {
                newHeight -= ((newTop + newHeight) - this.props.boundingRect.height);
            }
        }
        
        let rc = {
            left: newLeft,
            top: newTop,
            width: newWidth,
            height: newHeight
        };
        
        this.props.config.rect = rc;
        
        this.setState(rc);
    }
    
    getDefaultRect() {
        return config.defaultReportObjectRect;
    }
    
    getMoveResizeCursor(clientRect, mouseX, mouseY) {
        let retval = '';
    
        if ((Math.abs(clientRect.bottom - mouseY) < config.resizeMargin)
            && (Math.abs(clientRect.right - mouseX) < config.resizeMargin)) {
            retval = 'se-resize'
        } else if ((Math.abs(clientRect.bottom - mouseY) < config.resizeMargin)
                && (Math.abs(clientRect.left - mouseX) < config.resizeMargin)) {
            retval = 'sw-resize'
        } else if (Math.abs(clientRect.left - mouseX) < config.resizeMargin) {
            retval = 'w-resize';
        } else if (Math.abs(clientRect.right - mouseX) < config.resizeMargin) {
            retval = 'e-resize';
        } else if (Math.abs(clientRect.top - mouseY) < config.resizeMargin) {
            retval = 'n-resize';
        } else if (Math.abs(clientRect.bottom - mouseY) < config.resizeMargin) {
            retval = 's-resize';
        } else if (Math.abs(mouseY - clientRect.top) > config.moveOffset) {
            retval = this.getCustomResizeCursor(clientRect, mouseX, mouseY);
            if (!retval) {
                retval = config.moveCursor;
            }
        }
        
        return retval;
    }
    
    isResizeCursor(cursor) {
        return cursor && cursor.includes('-resize');
    }
    
    isMoveCursor(cursor) {
        return (cursor && (cursor === config.moveCursor));
    }
    
    getCustomResizeCursor(clientRect, mouseX, mouseY) {
        return undefined;
    }
    
    isCustomResizeCursor(cursor) {
        return false;
    }
    
    handleCustomResize(info) {
    
    }
    
    getCustomData(clientX, clientY, screenX, screenY) {
        return '';
    }
}


export {Resizable};
