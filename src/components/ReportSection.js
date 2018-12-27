import React from 'react';
import ReactDOM from 'react-dom';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearContextMenu} from './helpers';
import {getContextMenu} from './helpers';
import config from '../config/appconfig.json';

const reportSectionLoop = (obj, data) => {
    return data.map((item) => {
        return <li><button onClick={obj.addObject} value={item}>add {item}</button></li>
    });
};

class ReportSection extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins,
            itemsSelected: false
        };
        
        this.addObject = this.addObject.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins, itemsSelected: nextProps.itemsSelected});
    }

    showPopup(e, objid) {
        const {itemsSelected} = this.state;
        const cm = getContextMenu({event: e});
        if (this.isReportSection(objid)) {
            ReactDOM.render(<ul>{reportSectionLoop(this, config.reportObjectTypes, itemsSelected)} 
                {itemsSelected && <li><button onClick={this.deleteSelectedObjects}>{config.textmsg.deleteselectedobjects}</button></li>}</ul>, cm);
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
    
    deleteSelectedItems(e) {
        clearContextMenu();
    }

    getReportObjectPopupContent(obj) {
        
    }
    
    isReportSection(id) {
        return ((id === 'header') || (id === 'body') || (id === 'footer'));
    }
    
    getReportObject(objid) {
        let retval;
        
        if (document.designData.reportObjects) {
            for (let i = 0; i < document.designData.reportObjects.length; ++i) {
                if (document.designData.reportObjects[i].id === objid) {
                    retval = document.designData.reportObjects[i];
                    break;
                }
            }
        }
        
        return retval;
    }
}

export {ReportSection};