import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class BodyPanel extends BaseDesignComponent {
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
        this.setState({height: nextProps.height, margins: nextProps.margins, width: nextProps.width});
    }
    
    render() {
        const {height, margins, width} = this.state;

        return <div className="designChildContainer">
            <svg y="20" height={height} width={width} className="marginLines">
                <line x1={margins[0]} y1="2" x2={margins[0]} y2={height} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y="30" font-size="16" fill="lightGray">Body</text>
                <line x1={width - margins[2]} y1="2" x2={width - margins[2]} y2={height} stroke="cyan" stroke-width="0.75"/>
            </svg>
        </div>;
    }
}

    
export {BodyPanel};