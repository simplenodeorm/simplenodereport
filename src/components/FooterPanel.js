import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class FooterPanel extends BaseDesignComponent {
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
                <line x1={margins[0]} y1="0" x2={margins[0]} y2={height - margins[3]} stroke="cyan" stroke-width="0.75"/>
                <line x1={margins[0]} y1={height - margins[3]} x2={document.designData.documentWidth - margins[2]} y2={height-margins[3]} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y="20" font-size="16" fill="lightGray">Footer</text>
                <line x1={document.designData.documentWidth -margins[2]} y1="0" x2={document.designData.documentWidth - margins[2]} y2={height - margins[3]} stroke="cyan" stroke-width="0.75"/>
            </svg>
        
        </div>;
    }
}

    
export {FooterPanel};