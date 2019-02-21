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
    getFontHeight,
    getReportColumn,
    removeWaitMessage,
    setDefaultReportObjectSize
} from './helpers';
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
        this.alignObject = this.alignObject.bind(this);
        this.deleteReportObjects = this.deleteReportObjects.bind(this);
        this.onSave = this.onSave.bind(this);
        this.saveReport = this.saveReport.bind(this);
        this.initializeNewReport = this.initializeNewReport.bind(this);
        this.addReportObject = this.addReportObject.bind(this);
        this.showReportObjectPopup = this.showReportObjectPopup.bind(this);
        this.alignTextLeft = this.alignTextLeft.bind(this);
        this.alignTextCenter = this.alignTextCenter.bind(this);
        this.alignTextRight = this.alignTextRight.bind(this);
        this.alignText = this.alignText.bind(this);
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
                <button className="button" title={config.textmsg.newreport} onClick={this.newReport}>
                    <img alt={config.textmsg.newreport} src='/images/newreport.png'/>
                    <span className="label">{config.textmsg.new}</span>
                </button>
                <button className="button" disabled={!canAddObject} title={config.textmsg.newreportobject} onClick={this.showReportObjectPopup}>
                    {canAddObject && <img alt={config.textmsg.newreportobject} src='/images/newobject.png'/>}
                    {!canAddObject && <img alt={config.textmsg.newreportobject} src='/images/newobject-disabled.png'/>}
                    <span className="label">{config.textmsg.add}</span>
                </button>
                <div className="aligntool">
                    <button className="button" title={config.textmsg.alignleft} disabled={!canSave} onClick={this.alignTextLeft}>
                        {itemsSelected && <img alt={config.textmsg.alignleft} src='/images/align-text-left.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignleft} src='/images/align-text-left-disabled.png'/>}
                    </button>
                    <button className="button" title={config.textmsg.aligncenter} disabled={!canSave} onClick={this.alignTextCenter}>
                        {itemsSelected && <img alt={config.textmsg.aligncenter} src='/images/align-text-middle.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.aligncenter} src='/images/align-text-middle-disabled.png'/>}
                    </button>
                    <button className="button" title={config.textmsg.alignright} disabled={!canSave} onClick={this.alignTextRight}>
                        {itemsSelected && <img alt={config.textmsg.alignright} src='/images/align-text-right.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignright} src='/images/align-text-right-disabled.png'/>}
                    </button>
                </div>
                <div className="aligntool">
                    <button className="button" title={config.textmsg.alignobjectleft} disabled={!canSave} onClick={this.alignLeft}>
                        {itemsSelected && <img alt={config.textmsg.alignobjectleft} src='/images/align-left.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignobjectleft} src='/images/align-left-disabled.png'/>}
                    </button>
                    <button className="button" title={config.textmsg.alignobjecttop} disabled={!canSave} onClick={this.alignTop}>
                        {itemsSelected && <img alt={config.textmsg.alignobjecttop} src='/images/align-top.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignobjecttop} src='/images/align-top-disabled.png'/>}
                    </button>
                    <button className="button" title={config.textmsg.alignobjectright} disabled={!canSave} onClick={this.alignRight}>
                        {itemsSelected && <img alt={config.textmsg.alignobjectright} src='/images/align-right.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignobjectright} src='/images/align-right-disabled.png'/>}
                    </button>
                    <button className="button" title={config.textmsg.alignobjectbottom} disabled={!canSave} onClick={this.alignBottom}>
                        {itemsSelected && <img alt={config.textmsg.alignobjectbottom} src='/images/align-bottom.png'/>}
                        {!itemsSelected && <img alt={config.textmsg.alignobjectbottom} src='/images/align-bottom-disabled.png'/>}
                    </button>
                </div>
                <button className="button" title={config.textmsg.delete} disabled={!canSave} onClick={this.deleteReportObjects}>
                    {itemsSelected && <img alt={config.textmsg.delete} src='/images/delete.png'/>}
                    {!itemsSelected && <img alt={config.textmsg.delete} src='/images/delete-disabled.png'/>}
                    <span className="label">{config.textmsg.delete}</span>
                </button>
                <button className="button" title={config.textmsg.save} disabled={!canSave} onClick={this.onSave}>
                    {canSave && <img alt={config.textmsg.save} src='/images/save.png'/>}
                    {!canSave && <img alt={config.textmsg.save} src='/images/save-disabled.png'/>}
                    <span className="label">{config.textmsg.save}</span>
                </button>
                <button className="button" title={config.textmsg.run} disabled={!canSave} onClick={this.onRun}>
                    {canSave && <img alt={config.textmsg.run} src='/images/run.png'/>}
                    {!canSave && <img alt={config.textmsg.run} src='/images/run-disabled.png'/>}
                    <span className="label">{config.textmsg.run}</span>
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
        this.alignObject('left');
    }
    
    alignTop() {
        this.alignObject('top');
    }

    alignRight() {
        this.alignObject('right');
    }

    alignBottom() {
        this.alignObject('bottom');
    }
    
    alignObject(pos) {
        for (let i = 0; i < config.pageSections.length; ++i) {
            let dc = this.props.getDesignPanel().getReportSectionDesignCanvas(config.pageSections[i]);
            let selectedObjects = dc.getSelectedReportObjects();
            let fs = dc.firstSelected;
            if (!fs) {
                fs = selectedObjects[0];
            }
        
            for (let j = 0; j < selectedObjects.length; ++j) {
                if (selectedObjects[j] != fs) {
                    switch (pos) {
                        case 'left':
                            selectedObjects[j].rect.left = fs.rect.left;
                            dc.mountedReportObjects[selectedObjects[j].myIndex].setState({left: selectedObjects[j].rect.left});
                            break;
                        case 'top':
                            selectedObjects[j].rect.top = fs.rect.top;
                            dc.mountedReportObjects[selectedObjects[j].myIndex].setState({top: selectedObjects[j].rect.top});
                            break;
                        case 'right':
                            selectedObjects[j].rect.left = (fs.rect.left + fs.rect.width) - selectedObjects[j].rect.width;
                            dc.mountedReportObjects[selectedObjects[j].myIndex].setState({left: selectedObjects[j].rect.left});
                            break;
                        case 'bottom':
                            selectedObjects[j].rect.top = (fs.rect.top + fs.rect.height) - selectedObjects[j].rect.height;
                            dc.mountedReportObjects[selectedObjects[j].myIndex].setState({top: selectedObjects[j].rect.top});
                            break;
                    }
                }
            }
        
            dc.setState(dc.state);
        }
    }

    alignTextLeft() {
        this.alignText('left');
    }

    alignTextCenter() {
        this.alignText('center');
    }
    
    alignTextRight() {
        this.alignText('right');
    }
    
    alignText(pos) {
        for (let i = 0; i < config.pageSections.length; ++i) {
            let dc = this.props.getDesignPanel().getReportSectionDesignCanvas(config.pageSections[i]);
            let selectedObjects = dc.getSelectedReportObjects();
        
            for (let j = 0; j < selectedObjects.length; ++j) {
                selectedObjects[j].textAlign = pos;
                let comp = dc.mountedReportObjects[selectedObjects[j].myIndex];
                comp.setState(comp.state);
            }
        
            dc.setState(dc.state);
        }
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
    
    onRun() {
        alert('---->run');
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
                reportObject.asGrid = true;
                reportObject.pageBreakController = true;
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
        
        if ((reportObject.objectType === 'dbdata') && !reportObject.asGrid) {
            let height = getFontHeight(reportObject.dataFontSettings.font,
                reportObject.dataFontSettings.fontSize) + config.defaulttablecellpadding;
            let ypos = 20;
            for (let i = 0; i < reportObject.reportColumns.length; ++i) {
                if (reportObject.reportColumns[i].displayResult) {
                    let dbcol = getReportColumn(reportObject.reportColumns[i].key);
                    if (dbcol) {
                        let rol = {
                            objectType: 'label',
                            reportSection: reportObject.reportSection,
                            labelText: dbcol.name,
                            textAlign: 'right',
                            fontSettings: reportObject.headerFontSettings,
                            rect: {top: ypos, left: 20, height: height, width:100}
                        };
                        let ro = {
                            objectType: 'dbcol',
                            reportSection: reportObject.reportSection,
                            columnPath: dbcol.path,
                            columnName: dbcol.name,
                            textAlign: reportObject.reportColumns[i].textAlign,
                            fontSettings: reportObject.dataFontSettings,
                            rect: {top: ypos, left: 125, height: height, width:100}
                        };
                        rol.id = document.designData.currentReport.reportObjects.length;
                        document.designData.currentReport.reportObjects.push(rol);
                        designPanel.addReportObject(rol);
                        
                        ro.id = document.designData.currentReport.reportObjects.length;
                        document.designData.currentReport.reportObjects.push(ro);
                        designPanel.addReportObject(ro);
                        ypos += (height+5)
                    }
                }
            }
            
        } else {
            setDefaultReportObjectSize(designPanel, reportObject);
            reportObject.id = document.designData.currentReport.reportObjects.length;
            document.designData.currentReport.reportObjects.push(reportObject);
            designPanel.addReportObject(reportObject);
        }
    }
}

export {AppToolbar};
