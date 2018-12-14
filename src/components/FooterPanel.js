import React from 'react';
import "../app/App.css";
import {DesignCanvas} from './DesignCanvas';
import {ReportSection} from './ReportSection';

class FooterPanel extends ReportSection {
    constructor(props) {
        super(props);
    }

    render() {
        const {height, margins, width} = this.state;
        return <div className="designChildContainer">
            {document.designData.currentReport.documentSize &&
                <DesignCanvas 
                    location="footer" 
                    showPopup={this.showPopup} 
                    height={height - margins[3]} 
                    width={width - (margins[0] + margins[2])} 
                    marginLeft={margins[0]} marginTop={0}/> 
            }
            <svg width={width} height={height}>
                <line x1={margins[0]} y1="0" x2={margins[0]} y2={height - margins[3]} stroke="cyan" stroke-width="0.75"/>
                <line x1={margins[0]} y1={height - margins[3]} x2={width - margins[2]} y2={height-margins[3]} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y="20" font-size="16" fill="lightGray">Footer</text>
                <line x1={width - margins[2]} y1="0" x2={width - margins[2]} y2={height - margins[3]} stroke="cyan" stroke-width="0.75"/>
            </svg>
        </div>;
    }
}

    
export {FooterPanel};