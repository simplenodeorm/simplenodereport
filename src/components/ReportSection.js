import React from 'react';
import ReactDOM from 'react-dom';
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearContextMenu, getModalContainer, getContextMenu} from './helpers';
import config from '../config/appconfig.json';
import {DBDataGridSetupPanel} from './DBDataGridSetupPanel';

class ReportSection extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }

}

export {ReportSection};