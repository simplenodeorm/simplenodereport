import React from 'react';
import "../app/App.css";
import {LassoSelect} from './LassoSelect';

class DesignCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            marginLeft: this.props.marginLeft,
            marginTop: this.props.marginTop,
            height: this.props.height,
            width: this.props.width
        };
        
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
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
        this.dragImg = new Image(0,0);
        // transparent image
        this.dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            height: nextProps.height,
            width: nextProps.width, 
            marginLeft: nextProps.marginLeft, 
            marginTop: nextProps.marginTop});

    }
    
    render() {
        const {height, width, marginLeft, marginTop, lassoRect, lassoDisplay} = this.state;
        
        const canvasStyle = {
            height: (height-1) + 'px',
            width: width + 'px',
            marginLeft: (marginLeft-1) + 'px',
            marginTop: (marginTop-1) + 'px',
            background: 'transparent',
            position: 'absolute'
        };
        
        return <div ref={(c) => {this.myCanvas = c;}}
            draggable={true}
            style={canvasStyle}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDragEnd={this.onDragEnd}
            onDrop={this.onDrop}>
                {lassoRect && <LassoSelect rect={lassoRect} display={lassoDisplay}/>}
            </div>
    }
    
    
    onDragStart(info) {
        this.startDragPoint = [info.clientX,info.clientY];
        info.dataTransfer.setDragImage(this.dragImg, 0, 0);
        info.dataTransfer.setData('text/plain', JSON.stringify(this.startDragPoint)); 
 
    }
    
    onDragOver(info) {
        info.stopPropagation();
        info.preventDefault();
        
        if (this.startDragPoint) {
            
            let crect = this.myCanvas.getBoundingClientRect();
            
            let rc = {
                left: Math.min(this.startDragPoint[0], info.clientX) - crect.left,
                top: Math.min(this.startDragPoint[1], info.clientY) - crect.top,
                width: Math.abs(info.clientX - this.startDragPoint[0]),
                height: Math.abs(info.clientY - this.startDragPoint[1])
            };

            this.setState({lassoRect: rc, lassoDisplay: 'block'});
        }
    }

    onDrop(info) {
        info.stopPropagation();
        info.preventDefault();
    }
    
    onDragEnd(info) {
        this.startDragPoint = '';
        this.setState({lassoRect: {left: -100, top: -100, width: 0, height: 0}, lassoDisplay: 'none'});
    }
}

    
export {DesignCanvas};