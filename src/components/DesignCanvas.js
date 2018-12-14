import React from 'react';
import "../app/App.css";

class DesignCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            marginLeft: this.props.marginLeft,
            marginTop: this.props.marginTop,
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins
        };
        
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }
    
    render() {
        const {height, width, marginLeft, marginTop} = this.state;
        
        const myStyle = {
            height: (height-1) + 'px',
            width: width + 'px',
            marginLeft: (marginLeft-1) + 'px',
            marginTop: (marginTop-1) + 'px',
            background: 'transparent',
            position: 'absolute'
        };
        return <canvas onClick={this.onClick} ref={(cnv) => {this.myCanvas = cnv;}} style={myStyle}></canvas>
    }
    
    onClick(e) {
    }
}

    
export {DesignCanvas};