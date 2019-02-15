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
import config from '../config/appconfig';

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
                        split="horizontal"
                        minSize={0}
                        onDragFinished={this.onFooterSize}
                        defaultSize={height - document.designData.currentReport.footerHeight}>
                        <SplitPane
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
        for (let i = 0; i < config.pageSections.length; ++i) {
            this.getReportSectionDesignCanvas(config.pageSections[i]).removeSelectedReportObjects();
        }
    }
    
    removeAllReportObjects() {
        for (let i = 0; i < config.pageSections.length; ++i) {
            this.getReportSectionDesignCanvas(config.pageSections[i]).removeAllReportObjects();
        }
    }
    
    addReportObject(reportObjectConfig) {
        let dc = this.getReportSectionDesignCanvas(reportObjectConfig.reportSection);
        switch (reportObjectConfig.objectType) {
            case 'dbdata':
                dc.getReportObjectConfigurations().push(<DBDataReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
                    setMountedComponent={dc.setMountedComponent}
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;
            case 'label':
                dc.getReportObjectConfigurations().push(<LabelReportObject
                    key={reportObjectConfig.id}
                    index={dc.getReportObjectConfigurations().length}
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
                    onObjectSelect={this.onObjectSelect}
                    boundingRect={dc.getRect()}
                    config={reportObjectConfig}/>);
                break;

        }

        if (dc) {
            dc.setState(dc.state);
        }
    }

    onObjectSelect(selected) {
        this.props.getToolbar().onReportObjectSelect(selected);
    }
}

export {DesignPanel};

