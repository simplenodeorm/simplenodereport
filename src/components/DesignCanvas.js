import React from 'react';
import ReactDOM from 'react-dom';
import {clearContextMenu} from './helpers';
import {getContextMenu} from './helpers';
import config from '../config/appconfig.json';
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
        
        this.addObject = this.addObject.bind(this);
    }

    componentDidMount () {
        const me = this;
        const canvas = this.myCanvas;
        
        this.contextMenu = function(e) { 
            if (e.target === canvas) { 
                e.preventDefault();
                const cm = getContextMenu({event: e});
                ReactDOM.render(<ul><li><button onClick={me.addObject}>{config.textmsg.addobject}</button></li></ul>, cm);
                return false;
            }
        };
            
        document.addEventListener('contextmenu', this.contextMenu);
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
        return <canvas ref={(c) => {this.myCanvas = c;}} style={myStyle}></canvas>
    }
    
    addObject() {
        alert('------------->');
        clearContextMenu();
    }
}

    
export {DesignCanvas};