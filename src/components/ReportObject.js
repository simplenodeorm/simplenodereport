import React from 'react';
import "../app/App.css";

class ReportObject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let objectData = this.getObjectData();
        this.loadCss(objectData);
        return <div className={objectData.cssClassName}>{this.getContent(objectData)}</div>;
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
}

    
export {ReportObject};