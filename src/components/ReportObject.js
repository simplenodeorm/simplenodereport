import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';


class ReportObject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let objectData = this.getObjectData();
        this.loadCss(objectData);
        return <div onMouseMove={this.onMouseMove} className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
    }

    getConfigValue(nm) {
        return config[nm];
    }

    getConfigText(nm) {
        return config.textmsg[nm];
    }

    getHoverCss(prefix) {
        return prefix + ':hover { border: var(--active-report-object-border); }';
    }

    hasBorder(settings) {
        return (settings.borderStyle !== 'none');
    }

    hasFullBorder(settings) {
        return (settings.left && settings.top && settings.right && settings.bottom);
    }

    buildBorderCss(prefix, settings) {
        return prefix + ': '
            + settings.borderStyle
            + ' '
            + settings.borderWidth
            + 'px '
            + settings.borderColor + ';';
    }

    getObjectData() {
    }

    getContent() {
        return <div/>;
    }

    loadCss() {
    }

    getCssClassName() {
        return (document.designData.reportName.replace(/ /g, '-') + '-' + this.props.config.objectType + '-' + this.props.config.id);
    }
    
    onMouseMove(info) {
        let rc = info.target.getBoundingClientRect();
        if (((info.clientX - rc.left) < 3) || ((rc.width - (info.clientX - rc.left)) < 3)) {
            info.target.style.cursor = 'ew-resize';
        } else if ((((rc.top + rc.height) - info.clientY) < 3) || ((info.clientY -rc.top) < 3)) {
            info.target.style.cursor = 'ns-resize';
        } else {
            info.target.style.cursor = '';
        }
    }
}

    
export {ReportObject};