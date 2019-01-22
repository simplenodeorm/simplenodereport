import React from 'react';
import "../app/App.css";
import {DesignCanvas} from './DesignCanvas';
import {ReportSection} from './ReportSection';

class BodyPanel extends ReportSection {
    render() {
        const {height, margins, width} = this.state;

        return <div className="designChildContainer">
            {document.designData.currentReport.documentSize &&
                <DesignCanvas
                    ref={(dc) => {this.setDesignCanvas(dc)}}
                    location="body"
                    height={height}
                    width={width - (margins[0] + margins[2])} 
                    marginLeft={margins[0]} 
                    marginTop={0}/>
            }

            <svg y="20" height={height} width={width} className="marginLines">
                <line x1={margins[0]} y1="2" x2={margins[0]} y2={height} stroke="cyan" strokeWidth="0.75"/>
                <text x={margins[0] + 10} y="30" fontSize="16" fill="lightGray">Body</text>
                <line x1={width - margins[2]} y1="2" x2={width - margins[2]} y2={height} stroke="cyan" strokeWidth="0.75"/>
            </svg>
        </div>;
    }
}

    
export {BodyPanel};