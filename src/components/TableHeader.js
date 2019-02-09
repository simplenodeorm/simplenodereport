import React from 'react';
import {Resizable} from './Resizable';
import ReactDOM from "react-dom";
import {getMoveResizeCursor, isPointInRect} from "./helpers";

class TableHeader extends Resizable {
    constructor(props) {
        super(props);
    }

    render() {
        return <div
            onMouseOver={this.onMouseOver}
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            className="tableHeader">{this.props.config.name}</div>
    }
    
    onMouseOver(info) {
        if (!this.startInfo) {
            let rc = ReactDOM.findDOMNode(this).getBoundingClientRect();
            if (isPointInRect(info.clientX, info.clientY, rc)) {
                let cursor = getMoveResizeCursor(rc, info.clientX, info.clientY);
                if (cursor === 'e-resize') {
                    document.body.style.cursor = cursor;
                } else {
                    document.body.style.cursor = '';
                    this.startInfo = '';
                }
            } else {
                document.body.style.cursor = '';
            }
        } else {
            document.body.style.cursor = this.startInfo.cursor;
        }
    }
    
}

export {TableHeader};

