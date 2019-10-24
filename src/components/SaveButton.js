/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";

const saveEnabled = <img alt='save' src='/images/save.png' />;              
const saveDisabled = <img alt='save' src='/images/save-disabled.png' />;               

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.disabled) {
            return <button title="Save Query" className="saveButton" disabled>{saveDisabled}<span className="text">Save</span></button>;              
        } else {
            return <button title="Save Query" className="saveButton" onClick={this.props.onSave}>{saveEnabled}<span className="text">Save</span></button>;              
        }
    }
}

export {SaveButton};