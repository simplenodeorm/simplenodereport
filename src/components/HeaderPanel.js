import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {getPixelsPerInch} from './helpers.js';

class HeaderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    
    render() {
        return <div className="designChildContainer">header</div>;
    }
}

    
export {HeaderPanel};