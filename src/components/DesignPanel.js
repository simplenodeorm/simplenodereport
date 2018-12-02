import React from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ParameterInputPanel} from './ParameterInputPanel';
import {SaveDocumentPanel} from './SaveDocumentPanel';
import config from '../config/appconfig.json';
import axios from 'axios';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';


class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="designPanel">desgin panel</div>;
    }
}

export {DesignPanel};

