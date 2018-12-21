import React from 'react';
import "../app/App.css";

class LassoSelect extends React.Component {
    constructor(props) {
        super(props);
        
        if (this.props.rect) {
            this.state = {
                rect: this.props.rect,
                display: this.props.display
            };
            
        } else {
            this.state = {
                rect: {left: -100, top: -100, width: 0, height: 0},
                display: 'none'
            };
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({rect: nextProps.rect, display: nextProps.display});
    }

    render() {
        const {rect, display} = this.state;
        const myStyle = {
            left: rect.left + 'px',
            top: rect.top + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            display: display
        };
        
        return <div style={myStyle} className="lasso"></div>;              
    }
}

export {LassoSelect};