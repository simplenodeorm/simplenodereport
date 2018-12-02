import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class HeaderPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    
    componentWillReceiveProps(nextProps) {
    }

    render() {
        return <div className="designChildContainer">header</div>;
    }
}

    
export {HeaderPanel};