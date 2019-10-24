/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import "../app/App.css";

class HelpButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <span className="helpButton"><a href="/docs/rdesigner.pdf" target="_blank"><img alt='help' src='/images/help.png'/></a></span>;
    }
}

export {HelpButton};