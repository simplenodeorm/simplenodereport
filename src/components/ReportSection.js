/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';

class ReportSection extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            height: this.props.height,
            width: this.props.width,
            margins: this.props.margins,
        };
        this.getDesignCanvas = this.getDesignCanvas.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }

    getDesignCanvas() {
        return this.designCanvas;
    }
}

export {ReportSection};