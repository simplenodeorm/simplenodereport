import React from 'react';
import "../app/App.css";

const loadChildren = (data) => {
    return data.map((component) => {
        return component;
    });
};

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
        
        this.reportObjectComponents = [];
        this.getRect = this.getRect.bind(this);
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
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            height: nextProps.height,
            width: nextProps.width, 
            marginLeft: nextProps.marginLeft, 
            marginTop: nextProps.marginTop});

    }
    
    getReportObjectComponents() {
        return this.reportObjectComponents;
    }
    
    removeSelectedReportObjects() {
        for (let i = 0; i < this.reportObjectComponents.length; ++i) {
            if (this.reportObjectComponents[i].props.config.selected) {
                this.reportObjectComponents[i].props.config.ref.remove();
            }
        }
    }
    
    render() {
        const {height, width, marginLeft, marginTop} = this.state;
        
        const canvasStyle = {
            height: (height-1) + 'px',
            width: width + 'px',
            marginLeft: (marginLeft-1) + 'px',
            marginTop: (marginTop-1) + 'px',
        };
        
        return <div className="designCanvas"
            ref={(c) => {this.myCanvas = c;}}
                    style={canvasStyle}>
            {(this.reportObjectComponents.length > 0)
                && loadChildren(this.reportObjectComponents)}</div>
    }
    
    getRect() {
        const {hght, width} = this.state;
        return {
            left: 0,
            top: 0,
            width: Math.round(width),
            height: Math.round(hght)
        };
    }
}

    
export {DesignCanvas};