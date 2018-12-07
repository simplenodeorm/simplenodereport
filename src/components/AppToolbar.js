import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import {BaseDesignComponent} from './BaseDesignComponent';
import {PreferencesPanel} from './PreferencesPanel';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.newReport = this.newReport.bind(this);
        this.newReportObject = this.newReportObject.bind(this);
        this.preferences = this.preferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
        this.alignLeft = this.alignLeft.bind(this);
        this.alignTop = this.alignTop.bind(this);
        this.alignRight = this.alignRight.bind(this);
        this.alignBottom = this.alignBottom.bind(this);
        this.deleteReportObjects = this.deleteReportObjects.bind(this);
        this.saveReport = this.saveReport.bind(this);
    }
    
    render() {
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newDocument
                },
                {
                    text: config.textmsg.preferencesmenuname,
                    callback: this.preferences
                }
                ]
            }
        ];
        const orm = JSON.parse(localStorage.getItem('orm'));
        return <div>
            <Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>
            <div className="buttonbar">
                <button className="button" title='add new report' onClick={this.newReport}><img alt='new report' src='/images/newreport.png'/></button>
                <span className="label">New Report</span>
                <button className="button" title='add new report object' onClick={this.newReportObject}><img alt='new report' src='/images/newobject.png'/></button>
                <span className="label">Add Object</span>
                <div className="aligntool">
                    <button className="button" title='align selected objects left' onClick={this.alignLeft}><img alt='align left' src='/images/align-left.png'/></button>
                    <button className="button" title='align selected objects top' onClick={this.alignTop}><img alt='align top' src='/images/align-top.png'/></button>
                    <button className="button" title='align selected objects right' onClick={this.alignRight}><img alt='align right' src='/images/align-right.png'/></button>
                    <button className="button" title='align selected objects bottom' onClick={this.alignBottom}><img alt='align right' src='/images/align-bottom.png'/></button>
                </div>
                <button className="button" title='delete selected report object report' onClick={this.deleteReportObjects}><img alt='delete report objects' src='/images/delete.png'/></button>
                <span className="label">Delete Objects</span>
                <button className="button" title='save report' onClick={this.saveReport}><img alt='save report' src='/images/save.png'/></button>
                <span className="label">Save Report</span>
            </div>
        </div>;
    }

    newReport() {
        alert('add new report');
        this.props.setCurrentDocument();
    }

    newReportObject() {
        alert('add new report object');
    }
    
    alignLeft() {
    }
    
    alignTop() {
    }

    alignRight() {
    }

    alignBottom() {
    }
    
    deleteReportObjects() {
    }

    saveReport() {
    }
    
    preferences() {
        let rc = {left: 200, top: 75, width: 300, height: 350};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel onOk={this.savePreferences}/>, mc);
    }
    
    savePreferences(results) {
        localStorage.setItem('preferences', JSON.stringify(results));
    }
}

export {AppToolbar};
