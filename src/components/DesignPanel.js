import React from 'react';
import '../app/App.css';
import SplitPane from 'react-split-pane';
import {BaseDesignComponent} from './BaseDesignComponent';
import {HeaderPanel} from './HeaderPanel';
import {BodyPanel} from './BodyPanel';
import {FooterPanel} from './FooterPanel';
import {VerticalRule} from './VerticalRule';
import {HorizontalRule} from './HorizontalRule';
import {DBDataReportObject} from './DBDataReportObject';
import {LabelReportObject} from './LabelReportObject';
import {ImageReportObject} from './ImageReportObject';
import {LinkReportObject} from './LinkReportObject';
import {ShapeReportObject} from './ShapeReportObject';
import {CurrentDateReportObject} from './CurrentDateReportObject';
import {PageNumberReportObject} from './PageNumberReportObject';
import {ColumnDataReportObject} from './ColumnDataReportObject';
import {EmailReportObject} from './EmailReportObject';
import {clearContextMenu, clearModalContainer, copyObject} from './helpers';

import config from '../config/appconfig';

const ESCAPE_KEY = 27;
const DELETE_KEY = 46;
const UPARROW_KEY = 38;
const DOWNARROW_KEY = 40;
const LEFTARROW_KEY = 37;
const RIGHTARROW_KEY = 39;



class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.horizontalPositionChange = this.horizontalPositionChange.bind(this);
        this.verticalPositionChange = this.verticalPositionChange.bind(this);
        this.onHeaderSize = this.onHeaderSize.bind(this);
        this.onFooterSize = this.onFooterSize.bind(this);
        this.getReportSection = this.getReportSection.bind(this);
        this.getReportSectionDesignCanvas = this.getReportSectionDesignCanvas.bind(this);
        this.addReportObject = this.addReportObject.bind(this);
        this.refreshLayout = this.refreshLayout.bind(this);
        this.onObjectSelect = this.onObjectSelect.bind(this);
        this.removeAllReportObjects = this.removeAllReportObjects.bind(this);
        this.removeSelectedReportObjects = this.removeSelectedReportObjects.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.moveSelectedReportObjects = this.moveSelectedReportObjects.bind(this);
        this.deselectAllObjects = this.deselectAllObjects.bind(this);
        this.sizeSelectedReportObjects = this.sizeSelectedReportObjects.bind(this);
        this.updatePageBreak = this.updatePageBreak.bind(this);
        this.getSelectedReportObjects = this.getSelectedReportObjects.bind(this);
        
        this.header = '';
        this.body = '';
        this.footer = '';
        this.dw = '';

        this.state = {
            left: 0,
            top: 0,
            height: document.designData.currentReport.documentHeight,
            width: document.designData.currentReport.documentWidth,
            margins: document.designData.currentReport.margins
        };
    }
    
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }
    
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    
      handleKeyDown(event) {
        switch(event.keyCode) {
            case ESCAPE_KEY:
                clearContextMenu();
                clearModalContainer();
                this.deselectAllObjects();
                break;
            case DELETE_KEY:
                this.removeSelectedReportObjects();
                break;
            case UPARROW_KEY:
            case DOWNARROW_KEY:
            case LEFTARROW_KEY:
            case RIGHTARROW_KEY:
                if (event.shiftKey ) {
                    this.sizeSelectedReportObjects(event);
                } else {
                    this.moveSelectedReportObjects(event);
                }
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({left: nextProps.left, top: nextProps.top, margins: nextProps.margins});
    }

    render() {
        const {left, top, margins, height, width} = this.state;

        const designStyle = {
            left: left,
            top: top,
            height: (height + 'px'),
            width: (width + 'px')
        };
    
        return  <div onWheel={this.onWheel} className="designContainer">
            <HorizontalRule left={left} width={width} horizontalPositionChange={this.horizontalPositionChange}/>
            <div className="designPanel">
                <div ref={(dw) => {this.dw = dw}} className="documentWrapper" style={designStyle}>
                    <SplitPane
                        ref={(sp) => {this.splitPane1 = sp}}
                        split="horizontal"
                        minSize={0}
                        onDragFinished={this.onFooterSize}
                        defaultSize={height - document.designData.currentReport.footerHeight}>
                        <SplitPane
                            ref={(sp) => {this.splitPane2 = sp}}
                            split="horizontal"
                            minSize={0}
                            onDragFinished={this.onHeaderSize}
                            defaultSize={document.designData.currentReport.headerHeight}>
                            <HeaderPanel
                                ref={(hp) => {this.header = hp}}
                                margins={margins}
                                width={width}
                                height={document.designData.currentReport.headerHeight}
                                setStatus={this.props.setStatus}/>
                            <BodyPanel
                                ref={(bp) => {this.body = bp}}
                                margins={margins}
                                width={width}
                                height={height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)}
                                setStatus={this.props.setStatus}/>
                        </SplitPane>
                        <FooterPanel
                            ref={(fp) => {this.footer = fp}}
                            margins={margins}
                            width={width}
                            height={document.designData.currentReport.footerHeight}
                            setStatus={this.props.setStatus}/>
                    </SplitPane>
                </div>
            </div>
            <VerticalRule
                ref={(vr) => {this.verticalRule = vr}}
                top={top}
                height={height}
                verticalPositionChange={this.verticalPositionChange} />
        </div>
    }
    
    onWheel(e) {
        if (this.verticalRule) {
            this.verticalRule.onWheel(e);
        }
    }
    
    onHeaderSize(sz) {
        if (sz && this.header) {
            const {height} = this.state;
            document.designData.currentReport.headerHeight = sz;
            this.getReportSectionDesignCanvas('header').getRect().height += (height - sz);
            this.getReportSectionDesignCanvas('body').getRect().height += (sz - height);
            this.header.setState({height: sz});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
        }
    }
    
    onFooterSize(sz) {
        if (sz) {
            const {height} = this.state;
            document.designData.currentReport.footerHeight = (height - sz);
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }

    horizontalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: (-value) + 'px', top: this.dw.style.top});
            this.header.setState({height: height});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }
  
    verticalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: this.dw.style.left, top: (-value) + 'px'});
            this.header.setState({height: document.designData.currentReport.headerHeight});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }
    
    refreshLayout(doc) {
        if (doc) {
            if (!document.designData) {
                document.designData = {};
            }
            
            document.designData.currentReport = doc.document;
            for (let i = 0; i < document.designData.currentReport.reportObjects.length; ++i) {
                this.getReportSection(document.designData.currentReport.reportObjects[i].reportSection).setState({error:''});
                this.addReportObject(document.designData.currentReport.reportObjects[i]);
            }
            
            
            this.splitPane1.setState({draggedSize: (document.designData.currentReport.documentHeight - document.designData.currentReport.footerHeight)});
            this.splitPane2.setState({draggedSize: document.designData.currentReport.headerHeight});
        }

        this.props.setCurrentReport(document.designData.currentReport);

        let layout = {
            left: 0,
            top: 0,
            height: document.designData.currentReport.documentHeight,
            width: document.designData.currentReport.documentWidth,
            margins: document.designData.currentReport.margins
        };
    
        this.setState(layout);
    }

    getReportSection(sectionName) {
        let retval;
        switch(sectionName) {
            case 'header':
                retval = this.header;
                break;
            case 'body':
                retval = this.body;
                break;
            case 'footer':
                retval = this.footer;
                break;
        }
        return retval;
    }

    getReportSectionDesignCanvas(sectionName) {
         return this.getReportSection(sectionName).getDesignCanvas();
    }
    
    removeSelectedReportObjects() {
        if (window.confirm(config.textmsg.deleteconfirmprompt)) {
            for (let i = 0; i < config.pageSections.length; ++i) {
                this.getReportSectionDesignCanvas(config.pageSections[i]).removeSelectedReportObjects();
            }
            this.props.getToolbar().selectedReportObjectCounter = 0;
            this.props.getToolbar().setState({itemsSelected: false});
    
        }
    }
    
    removeAllReportObjects() {
        for (let i = 0; i < config.pageSections.length; ++i) {
            this.getReportSectionDesignCanvas(config.pageSections[i]).removeAllReportObjects();
        }
    }
    
    getSelectedReportObjects() {
        let retval = [];
        for (let i = 0; i < config.pageSections.length; ++i) {
            retval.push(this.getReportSectionDesignCanvas(config.pageSections[i]).getSelectedReportObjects());
        }
        return retval;
    }
    
    addReportObject(reportObjectConfig) {
        let dc = this.getReportSectionDesignCanvas(reportObjectConfig.reportSection);
        switch (reportObjectConfig.objectType) {
            case 'dbdata':
                dc.getReportObjectConfigurations().push(<DBDataReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'label':
                dc.getReportObjectConfigurations().push(<LabelReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    setMountedComponent={dc.setMountedComponent}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'image':
                dc.getReportObjectConfigurations().push(<ImageReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'link':
                dc.getReportObjectConfigurations().push(<LinkReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'email':
                dc.getReportObjectConfigurations().push(<EmailReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'shape':
                dc.getReportObjectConfigurations().push(<ShapeReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'current date':
                dc.getReportObjectConfigurations().push(<CurrentDateReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    setMountedComponent={dc.setMountedComponent}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'page number':
                dc.getReportObjectConfigurations().push(<PageNumberReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    setMountedComponent={dc.setMountedComponent}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'dbcol':
                dc.getReportObjectConfigurations().push(<ColumnDataReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    getSelectedReportObjects={this.getSelectedReportObjects}
                    setMountedComponent={dc.setMountedComponent}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    updatePageBreak={this.updatePageBreak}
                    config={reportObjectConfig}/>);
                break;
        }

        if (dc) {
            dc.setState(dc.state);
        }
    }
    
    updatePageBreak(curobj) {
        for (let i = 0; i < document.designData.currentReport.reportObjects.length; ++i) {
            if (curobj !== document.designData.currentReport.reportObjects[i]) {
                document.designData.currentReport.reportObjects[i].pageBreakController = '';
            }
        }
    }

    onObjectSelect(ro) {
        let canvas = this.getReportSectionDesignCanvas(ro.reportSection);
        if (ro.selected && (!canvas.firstSelected || !canvas.firstSelected.selected)) {
            canvas.firstSelected = ro;
        }
        
        this.props.getToolbar().onReportObjectSelect(ro.selected);
    }
    
    moveSelectedReportObjects(e) {
        for (let i = 0; i < config.pageSections.length; ++i) {
            let canvas = this.getReportSectionDesignCanvas(config.pageSections[i]);
            let robjects = canvas.getSelectedReportObjects();
            if (robjects.length > 0) {
                e.preventDefault();
            }
            for (let i = 0; i < robjects.length; ++i) {
                let rc = copyObject(robjects[i].rect);
                switch(e.keyCode) {
                    case UPARROW_KEY:
                        rc.top -= config.keyMoveIncrement;
                        break;
                    case DOWNARROW_KEY:
                        rc.top += config.keyMoveIncrement;
                        break;
                    case LEFTARROW_KEY:
                        rc.left -= config.keyMoveIncrement;
                        break;
                    case RIGHTARROW_KEY:
                        rc.left += config.keyMoveIncrement;
                        break;
    
                }
                canvas.mountedReportObjects[robjects[i].myIndex].onLayoutChange(rc);
                
            }
        }
    }
    
    sizeSelectedReportObjects(e) {
        for (let i = 0; i < config.pageSections.length; ++i) {
            let canvas = this.getReportSectionDesignCanvas(config.pageSections[i]);
            let robjects = canvas.getSelectedReportObjects();
            if (robjects.length > 0) {
                e.preventDefault();
            }
            for (let i = 0; i < robjects.length; ++i) {
                let rc = copyObject(robjects[i].rect);
                switch(e.keyCode) {
                    case UPARROW_KEY:
                        rc.height -= config.keyMoveIncrement;
                        break;
                    case DOWNARROW_KEY:
                        rc.height += config.keyMoveIncrement;
                        break;
                    case LEFTARROW_KEY:
                        rc.width -= config.keyMoveIncrement;
                        break;
                    case RIGHTARROW_KEY:
                        rc.width += config.keyMoveIncrement;
                        break;
                }
                
                canvas.mountedReportObjects[robjects[i].myIndex].onLayoutChange(rc);
            }
        }
    }


    deselectAllObjects() {
        for (let i = 0; i < config.pageSections.length; ++i) {
            let canvas = this.getReportSectionDesignCanvas(config.pageSections[i]);
            let robjects = canvas.getSelectedReportObjects();
            for (let i = 0; i < robjects.length; ++i) {
                robjects[i].selected = false;
                canvas.mountedReportObjects[robjects[i].myIndex].setState(canvas.mountedReportObjects[robjects[i].myIndex].state);
            }
        }
    }
}

export {DesignPanel};

