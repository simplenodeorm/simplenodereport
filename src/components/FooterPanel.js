import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class FooterPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }
    
    render() {
        const {height, margins, width} = this.state;
        return <div className="designChildContainer">
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