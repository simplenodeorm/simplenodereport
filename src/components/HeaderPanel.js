import React from 'react';
import "../app/App.css";
import {DesignCanvas} from './DesignCanvas';
import {ReportSection} from './ReportSection';

class HeaderPanel extends ReportSection {
    render() {
        const {height, margins, width} = this.state;

        return <div className="designChildContainer">
            <DesignCanvas
                ref={(dc) => {this.designCanvas = dc}}
                location="header"
                height={height - margins[1]}
                width={width - (margins[0] + margins[2])}
                marginLeft={margins[0]}
                marginTop={margins[1]}/>
            <svg width={width} height={height}>
                <line x1={margins[0]} y1={margins[1]} x2={margins[0]} y2={height} stroke="cyan" strokeWidth="0.75"/>
                <line x1={margins[0]} y1={margins[1]} x2={width - margins[2]} y2={margins[1]} stroke="cyan" strokeWidth="0.75"/>
                <text x={margins[0] + 10} y={margins[1] + 20} fontSize="16" fill="lightGray">Header</text>
                <line x1={width - margins[2]} y1={margins[1]} x2={width - margins[2]} y2={height} stroke="cyan" strokeWidth="0.75"/>
            </svg>
        </div>;
    }
}

    
export {HeaderPanel};