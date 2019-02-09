import React from 'react';
import ReactDOM from "react-dom";
import {getMoveResizeCursor, isMoveCursor, isPointInRect, isResizeCursor} from "./helpers";
import config from "../config/appconfig";

class Resizable extends React.Component {
    constructor(props) {
        super(props);
        
        let rc = this.props.config.rect;
        if (!rc || !this.props.config.rect.height) {
            rc = this.getDefaultRect();
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
                document.addEventListener('mouseup', this.onMouseUp, true);
                document.addEventListener('mouseover', this.onMouseOver, true);
                this.startInfo = {x: info.screenX, y: info.screenY, cursor: document.body.style.cursor};
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
                        this.onLayoutChange({left: newLeft, top: top, width: width + (left - newLeft), height: height});
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
                        this.onLayoutChange({left: left, top: newTop,
                            width: width, height: height + (top - newTop)});
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
            
            document.body.style.cursor = '';
            this.startInfo = '';
            info.preventDefault();
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

        if (this.props.rect) {
            this.props.config.rect = rc;
        }
        
        this.setState(rc);
    }
    
    getDefaultRect() {
        return config.defaultReportObjectRect;
    }
    
}

export {Resizable};
