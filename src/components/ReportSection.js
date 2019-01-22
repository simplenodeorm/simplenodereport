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
        this.designCanvas;
        this.getDesignCanvas = this.getDesignCanvas.bind(this)
        this.setDesignCanvas = this.setDesignCanvas.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({height: nextProps.height, width: nextProps.width, margins: nextProps.margins});
    }

    setDesignCanvas(designCanvas) {
        this.designCanvas = designCanvas;
    }

    getDesignCanvas() {
        return this.designCanvas;
    }
}

export {ReportSection};