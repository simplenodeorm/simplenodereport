import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {getPixelsPerInch} from './helpers.js';

class HeaderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height});
    }
    
    render() {
        const {height} = this.state;
        let margins = this.props.margins;
        return <div className="designChildContainer">
            <svg width={document.designData.documentWidth} height={height}>
                <line x1={margins[0]} y1={margins[1]} x2={margins[0]} y2={height} stroke="cyan" stroke-width="0.75"/>
                <line x1={margins[0]} y1={margins[1]} x2={document.designData.documentWidth - margins[2]} y2={margins[1]} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y={margins[1] + 20} font-size="16" fill="lightGray">Header</text>
                <line x1={document.designData.documentWidth -margins[2]} y1={margins[1]} x2={document.designData.documentWidth - margins[2]} y2={height} stroke="cyan" stroke-width="0.75"/>
            </svg>
        </div>;
    }
}

    
export {HeaderPanel};