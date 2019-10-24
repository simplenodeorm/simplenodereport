/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";

const clipboardDisabled = <img alt='copy to clipboard' src='/images/clipboard-disabled.png' />;              
const clipboard = <img alt='copy to clipboard' src='/images/clipboard.png' />;               
const clipboardData = <img alt='copy to clipboard' src='/images/clipboard-withdata.png' />;               

class ClipboardButton extends React.Component {
    constructor(props) {
        super(props);
        this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
        this.state = {
            hasdata: false
        };
    }
    
    render() {
        const {hasdata} = this.state;
        
        if (this.props.disabled) {
            return <button title="copy to clipboard" className="clipboardButton" disabled>{clipboardDisabled}</button>;              
        } else if (hasdata) {
            return <button title="copy to clipboard" className="clipboardButton" onClick={this.onCopyToClipboard}>{clipboardData}</button>;              
        } else {
            return <button title="copy to clipboard" className="clipboardButton" onClick={this.onCopyToClipboard}>{clipboard}</button>;              
        }
    }
    
    onCopyToClipboard() {
        this.props.onCopyToClipboard();
        this.setState({hasdata:true})
    }
}

export {ClipboardButton};