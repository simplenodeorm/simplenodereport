import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class FooterPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    
    render() {
        return <div className="designChildContainer">footer</div>;
    }
}

    
export {FooterPanel};