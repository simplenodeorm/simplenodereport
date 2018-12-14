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

    showPopup(e) {
        const cm = getContextMenu({event: e});
        ReactDOM.render(<ul><li><button onClick={this.addObject}>{config.textmsg.addobject}</button></li></ul>, cm);
    }
    
    addObject(e) {
        clearContextMenu();
    }
}

export {ReportSection};