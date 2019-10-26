/*
 * Copyright (c) 2019 simplenodeorm.org
 */

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
        
        this.mountedReportObjects = [];
        this.reportObjectConfigurations = [];
        this.getRect = this.getRect.bind(this);
        this.setMountedComponent = this.setMountedComponent.bind(this);
        this.getSelectedReportObjects = this.getSelectedReportObjects.bind(this);
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
    
    getReportObjectConfigurations() {
        return this.reportObjectConfigurations;
    }
    
    removeSelectedReportObjects() {
        if (this.reportObjectConfigurations) {
            for (let i = 0; i < this.reportObjectConfigurations.length; ++i) {
                if (this.reportObjectConfigurations[i].props.config.selected) {
                    this.reportObjectConfigurations[i].props.config.objectType = 'deleted';
                    this.mountedReportObjects[i].remove();
                }
            }
            this.setState(this.state);
        }
    }
    
    getSelectedReportObjects() {
        let retval = [];
        if (this.reportObjectConfigurations) {
            for (let i = 0; i < this.reportObjectConfigurations.length; ++i) {
                if (this.reportObjectConfigurations[i].props.config.selected) {
                    this.reportObjectConfigurations[i].props.config.myIndex = i;
                    retval.push(this.reportObjectConfigurations[i].props.config);
                }
            }
        }
        return retval;
    }
    
    removeAllReportObjects() {
        if (this.reportObjectConfigurations) {
            for (let i = 0; i < this.reportObjectConfigurations.length; ++i) {
               this.mountedReportObjects[i].remove();
            }
            this.setState(this.state);
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
                    onKeyUp={this.onKeyUp}
            ref={(c) => {this.myCanvas = c;}}
                    style={canvasStyle}>
            {(this.reportObjectConfigurations.length > 0)
                && loadChildren(this.reportObjectConfigurations)}</div>
    }
    
    getRect() {
        const {height, width} = this.state;
        return {
            left: 0,
            top: 0,
            width: Math.round(width),
            height: Math.round(height)
        };
    }
    
    setMountedComponent(comp) {
        this.mountedReportObjects[comp.props.index] = comp;
    }
}

    
export {DesignCanvas};