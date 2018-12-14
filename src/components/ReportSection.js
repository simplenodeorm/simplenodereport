import React from 'react';
import ReactDOM from 'react-dom';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearContextMenu} from './helpers';
import {getContextMenu} from './helpers';
import config from '../config/appconfig.json';

class ReportSection extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins
        };
        
        this.addObject = this.addObject.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }

    showPopup(e, objid) {
        const cm = getContextMenu({event: e});
        if (this.isReportSection(objid)) {
            ReactDOM.render(<ul><li><button onClick={this.addObject}>{config.textmsg.addobject}</button></li></ul>, cm);
        } else {
            let obj = this.getReportObject(objid);
            
            if (obj) {
                ReactDOM.render(this.getReportObjectPopupContent(obj), cm);
            }
        }
    }
    
    addObject(e) {
        clearContextMenu();
    }
    
    getReportObjectPopupContent(obj) {
        alert('----------->in getReportObjectPopupContent');
        
    }
    
    isReportSection(id) {
        return ((id === 'header') || (id === 'body') || (id === 'footer'));
    }
    
    getReportObject(objid) {
        let retval;
        
        if (document.designData.reportObjects) {
            for (let i = 0; i < document.designData.reportObjects.length; ++i) {
                if (document.designData.reportObjects[i].id == objid) {
                    retval = document.designData.reportObjects[i];
                    break;
                }
            }
        }
        
        return retval;
    }
}

export {ReportSection};