import React from 'react';
import "../app/App.css";
import {DesignCanvas} from './DesignCanvas';
import {ReportSection} from './ReportSection';

class BodyPanel extends ReportSection {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {height, margins, width} = this.state;

        return <div className="designChildContainer">
            {document.designData.currentReport.documentSize &&
                <DesignCanvas 
                    location="body" 
                    showPopup={this.showPopup} 
                    height={height} 
                    width={width - (margins[0] + margins[2])} 
                    marginLeft={margins[0]} 
                    marginTop={margins[0]}/>
            }
            <svg y="20" height={height} width={width} className="marginLines">
                <line x1={margins[0]} y1="2" x2={margins[0]} y2={height} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y="30" font-size="16" fill="lightGray">Body</text>
                <line x1={width - margins[2]} y1="2" x2={width - margins[2]} y2={height} stroke="cyan" stroke-width="0.75"/>
            </svg>
        </div>;
    }
}

    
export {BodyPanel};