import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import defaults from '../config/defaults';
import {BaseDesignComponent} from './BaseDesignComponent';
import {PreferencesPanel} from './PreferencesPanel';
import {SaveReportPanel} from './SaveReportPanel';
import {
    clearContextMenu,
    clearDocumentDesignData,
    copyObject,
    getContextMenu,
    removeWaitMessage,
    setDefaultReportObjectSize} from './helpers';
import {getModalContainer} from './helpers';
import {getDocumentDimensions} from './helpers';
import {getPixelsPerInch} from './helpers.js';
import axios from 'axios';
import {DBDataGridSetupPanel} from "./DBDataGridSetupPanel";
import {LabelSetupPanel} from "./LabelSetupPanel";
import {ImageSetupPanel} from "./ImageSetupPanel";
import {LinkSetupPanel} from "./LinkSetupPanel";
import {ShapeSetupPanel} from "./ShapeSetupPanel";
import {CurrentDateSetupPanel} from './CurrentDateSetupPanel';
import {PageNumberSetupPanel} from './PageNumberSetupPanel';

const reportObjectLoop = (obj, data) => {
    return data.map((item) => {
        return <li><button onClick={obj.addReportObject} value={item}>{item}</button></li>
    });
};

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.newReport = this.newReport.bind(this);
        this.preferences = this.preferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
        this.alignLeft = this.alignLeft.bind(this);
        this.alignTop = this.alignTop.bind(this);
        this.alignRight = this.alignRight.bind(this);
        this.alignBottom = this.alignBottom.bind(this);
        this.deleteReportObjects = this.deleteReportObjects.bind(this);
        this.onSave = this.onSave.bind(this);
        this.saveReport = this.saveReport.bind(this);
        this.initializeNewReport = this.initializeNewReport.bind(this);
        this.addReportObject = this.addReportObject.bind(this);
        this.showReportObjectPopup = this.showReportObjectPopup.bind(this);
        this.alignTextLeft = this.alignTextLeft.bind(this);
        this.alignTextMiddle = this.alignTextMiddle.bind(this);
        this.alignTextRight = this.alignTextRight.bind(this);
        this.addReportObjectToReport = this.addReportObjectToReport.bind(this);
        this.onReportObjectSelect = this.onReportObjectSelect.bind(this);
        this.showReportObjectPopup = this.showReportObjectPopup.bind(this);
        
        this.selectedReportObjectCounter = 0;
        
        this.state = {
            canSave: false,
            canAddObject: false,
            itemsSelected: false
        };
    }
    
    render() {
        const {canSave, canAddObject, itemsSelected} = this.state;
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newReport
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
            <Toolbar menu={menu} brand={orm.name} logo="logo.png"/>
            <div className="buttonbar">
                <button className="button" title='add new report' onClick={this.newReport}>
                    <img alt='new report' src='/images/newreport.png'/>
                    <span className="label">New Report</span>
                </button>
                <button className="button" disabled={!canAddObject} title='add new report object' onClick={this.showReportObjectPopup}>
                    {canAddObject && <img alt='new report object' src='/images/newobject.png'/>}
                    {!canAddObject && <img alt='new report object' src='/images/newobject-disabled.png'/>}
                    <span className="label">Add Object</span>
                </button>
                <div className="aligntool">
                    <button className="button" title='align text left' disabled={!canSave} onClick={this.textAlignLeft}>
                        {itemsSelected && <img alt='align text left' src='/images/align-text-left.png'/>} 
                        {!itemsSelected && <img alt='align text left' src='/images/align-text-left-disabled.png'/>}
                    </button>
                    <button className="button" title='align text middle' disabled={!canSave} onClick={this.textAlignMiddle}>
                        {itemsSelected && <img alt='align text middle' src='/images/align-text-middle.png'/>} 
                        {!itemsSelected && <img alt='align text middle' src='/images/align-text-middle-disabled.png'/>}
                    </button>
                    <button className="button" title='align text right' disabled={!canSave} onClick={this.textAlignRight}>
                        {itemsSelected && <img alt='align text right' src='/images/align-text-right.png'/>} 
                        {!itemsSelected && <img alt='align text right' src='/images/align-text-right-disabled.png'/>}
                    </button>
                </div>
                <div className="aligntool">
                    <button className="button" title='align selected objects left' disabled={!canSave} onClick={this.alignLeft}>
                        {itemsSelected && <img alt='align left' src='/images/align-left.png'/>} 
                        {!itemsSelected && <img alt='align left' src='/images/align-left-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects top' disabled={!canSave} onClick={this.alignTop}>
                        {itemsSelected && <img alt='align top' src='/images/align-top.png'/>} 
                        {!itemsSelected && <img alt='align top' src='/images/align-top-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects right' disabled={!canSave} onClick={this.alignRight}>
                        {itemsSelected && <img alt='align right' src='/images/align-right.png'/>} 
                        {!itemsSelected && <img alt='align right' src='/images/align-right-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects bottom' disabled={!canSave} onClick={this.alignBottom}>
                        {itemsSelected && <img alt='align bottom' src='/images/align-bottom.png'/>} 
                        {!itemsSelected && <img alt='align bottom' src='/images/align-bottom-disabled.png'/>}
                    </button>
                </div>
                <button className="button" title='delete selected report object report' disabled={!canSave} onClick={this.deleteReportObjects}>
                    {itemsSelected && <img alt='delete report objects' src='/images/delete.png'/>} 
                    {!itemsSelected && <img alt='delete report objects' src='/images/delete-disabled.png'/>}
                    <span className="label">Delete Objects</span>
                </button>
                <button className="button" title='save report' disabled={!canSave} onClick={this.onSave}>
                    {canSave && <img alt='save report' src='/images/save.png'/>} 
                    {!canSave && <img alt='save report' src='/images/save-disabled.png'/>}
                    <span className="label">Save Report</span>
                </button>
            </div>
        </div>;
    }

    newReport() {
        let rc = {left: 200, top: 75, width: 400, height: 400};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel newDocument={true} onOk={this.initializeNewReport}/>, mc);
    }

    alignLeft() {
    }
    
    alignTop() {
    }

    alignRight() {
    }

    alignBottom() {
    }
    

    alignTextLeft() {
    }

    alignTextMiddle() {
    }
    
    alignTextRight() {
    }
    
    
    deleteReportObjects() {
        this.props.getDesignPanel().removeSelectedReportObjects();
    }

    initializeNewReport(settings) {
        clearDocumentDesignData();
        let dim = getDocumentDimensions(settings.documentSize);
        let ppi = getPixelsPerInch();
    
        let headerHeight;
        let footerHeight;
        
        if (dim[0] < 2) {
            headerHeight = ppi/4;
        } else if (dim[0] < 5) {
            headerHeight = ppi/2;
        } else {
            headerHeight = ppi;
        }
    
        if (dim[1] < 2) {
            footerHeight = ppi/4;
        } else if (dim[1] < 5) {
            footerHeight = ppi/2;
        } else {
            footerHeight = ppi;
        }

        let doc = {
            document: {
                reportName: settings.reportName,
                documentWidth: dim[0] * ppi,
                documentHeight: dim[1] * ppi,
                headerHeight: headerHeight,
                footerHeight: footerHeight,
                documentSize: settings.documentSize,
                margins: [
                    ppi * settings.marginLeft,
                    ppi * settings.marginTop,
                    ppi * settings.marginRight,
                    ppi * settings.marginBottom],
                reportObjects: []
            }
        };

        
        for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
            doc.document[config.defaultPreferenceNames[i]] = defaults[config.defaultPreferenceNames[i]];
        }
    
        doc.document.queryDocumentId = settings.queryDocumentId;
        this.props.getDesignPanel().removeAllReportObjects();
        document.designData = '';
        this.props.getDesignPanel().refreshLayout(doc);
        this.setState({canSave: true, canAddObject: true});
    }
    
    
    onSave() {
        let rc = {left: 200, top: 50, width: 450, height: 425};
        let mc = getModalContainer(rc);
        ReactDOM.render(<SaveReportPanel onOk={this.saveReport}/>, mc);
    }
    
    saveReport(params) {
        this.showWaitMessage('Saving report...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        
        let doc = this.getReportDocument(params);
        let validObjects = [];
        for(let i = 0; i < doc.document.reportObjects.length; ++i) {
            if (!doc.document.reportObjects[i].removed) {
                doc.document.reportObjects[i].selected = false;
                validObjects.push(doc.document.reportObjects[i]);
            }
        }
    
        if (validObjects.length > 0) {
            doc.document.reportObjects.length = 0;
            for (let i = 0; i < validObjects.length; ++i) {
                doc.document.reportObjects.push(validObjects[i]);
            }
        }
    
        doc.document.pixelsPerInch = getPixelsPerInch();
        axios.post(orm.url + '/report/save', doc, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.props.setStatus('report saved', false);
                    removeWaitMessage();
                    curcomp.props.reloadDocuments();
                } else {
                    removeWaitMessage();
                    curcomp.props.setStatus(response.statusText, true);
                }
                
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                removeWaitMessage();
            });     
    }

    preferences() {
        let rc = {left: 200, top: 75, width: 400, height: 350};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel onOk={this.savePreferences}/>, mc);
    }

    savePreferences(results) {
        localStorage.setItem('preferences', JSON.stringify(results));
    }

    showReportObjectPopup(e) {
        const curobj = this;
        const cm = getContextMenu({target: curobj, event: e, yOffset: 20});
        ReactDOM.render(<ul>{reportObjectLoop(curobj, config.reportObjectTypes)}</ul>, cm);
    }

    addReportObject(e) {
        clearContextMenu();
        this.showReportObjectSetupPanel(e.target.value);
    }

    onReportObjectSelect(selected) {
        let saveCount = this.selectedReportObjectCounter;
        
        if (selected) {
            this.selectedReportObjectCounter++;
        } else {
            this.selectedReportObjectCounter--;
            this.selectedReportObjectCounter = Math.max(0, this.selectedReportObjectCounter);
        }
        
        
        if ((saveCount > 0) && (this.selectedReportObjectCounter === 0)) {
            this.setState({itemsSelected: false})
        } else if ((saveCount === 0) && (this.selectedReportObjectCounter > 0)) {
            this.setState({itemsSelected: true})
        }
    }
    
    showReportObjectSetupPanel(type, reportObject) {
        let rc;
        let mc;
        if (!reportObject) {
            reportObject = {
                objectType: type,
                labelText: config.textmsg.defaultreportlabeltext,
                textAlign: "right",
                rect: ''
            };
        } else {
            reportObject = copyObject(reportObject);
        }
    
        switch(type) {
            case 'dbdata':
                rc = {left: 175, top: 50, width: 600, height: 400};
                mc = getModalContainer(rc);
                ReactDOM.render(<DBDataGridSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'label':
                rc = {left: 175, top: 50, width: 300, height: 375};
                mc = getModalContainer(rc);
                ReactDOM.render(<LabelSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'image':
                rc = {left: 175, top: 50, width: 375, height: 200};
                mc = getModalContainer(rc);
                ReactDOM.render(<ImageSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'link':
                rc = {left: 175, top: 50, width: 375, height: 450};
                mc = getModalContainer(rc);
                ReactDOM.render(<LinkSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'shape':
                rc = {left: 175, top: 50, width: 275, height: 300};
                mc = getModalContainer(rc);
                ReactDOM.render(<ShapeSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'current date':
                rc = {left: 175, top: 50, width: 300, height: 375};
                mc = getModalContainer(rc);
                ReactDOM.render(<CurrentDateSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'page number':
                rc = {left: 175, top: 50, width: 300, height: 375};
                mc = getModalContainer(rc);
                ReactDOM.render(<PageNumberSetupPanel
                    onOk={this.addReportObjectToReport}
                    reportObject={reportObject}/>, mc);
                break;
            case 'graph':
                alert('Under construction');
                break;
        }
    }
    
    addReportObjectToReport(reportObject) {
        let designPanel = this.props.getDesignPanel();
        if (!document.designData.currentReport.reportObjects) {
            document.designData.currentReport.reportObjects = [];
        }
        
        setDefaultReportObjectSize(designPanel, reportObject);
        
        reportObject.id = document.designData.currentReport.reportObjects.length;
        document.designData.currentReport.reportObjects.push(reportObject);
        designPanel.addReportObject(reportObject);
    }
}

export {AppToolbar};
