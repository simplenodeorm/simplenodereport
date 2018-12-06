import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class BodyPanel extends BaseDesignComponent {
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
            <svg y="20" height={height} width={document.designData.documentWidth} className="marginLines">
                <line x1={margins[0]} y1="2" x2={margins[0]} y2={height} stroke="cyan" stroke-width="0.75"/>
                <text x={margins[0] + 10} y="30" font-size="16" fill="lightGray">Body</text>
                <line x1={document.designData.documentWidth -margins[2]} y1="2" x2={document.designData.documentWidth - margins[2]} y2={height} stroke="cyan" stroke-width="0.75"/>
            </svg>
        </div>;
    }
}

    
export {BodyPanel};