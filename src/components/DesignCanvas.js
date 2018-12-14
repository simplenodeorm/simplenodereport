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
        };
    }

    componentDidMount () {
        const curobj = this;
        const canvas = this.myCanvas;
        
        this.contextMenu = function(e) { 
            if (e.target === canvas) { 
                e.preventDefault();
                curobj.props.showPopup(e, curobj.props.location);
                return false;
            }
        };
            
        document.addEventListener('contextmenu', this.contextMenu);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            height: nextProps.height,
            width: nextProps.width, 
            marginLeft: nextProps.marginLeft, 
            marginTop: nextProps.marginTop});
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
        return <canvas ref={(c) => {this.myCanvas = c;}} style={myStyle}></canvas>
    }
}

    
export {DesignCanvas};