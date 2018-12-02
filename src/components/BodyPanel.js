import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';

class BodyPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    
    componentWillReceiveProps(nextProps) {
    }

    render() {
        return <div className="designChildContainer">body</div>;
    }
}

    
export {BodyPanel};