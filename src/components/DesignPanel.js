import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import SplitPane from 'react-split-pane';
import {BaseDesignComponent} from './BaseDesignComponent';
import {ParameterInputPanel} from './ParameterInputPanel';
import {SaveDocumentPanel} from './SaveDocumentPanel';
import {HeaderPanel} from './HeaderPanel';
import {BodyPanel} from './BodyPanel';
import {FooterPanel} from './FooterPanel';
import config from '../config/appconfig.json';
import defaults from '../config/defaults.json';
import axios from 'axios';
import {clearDocumentDesignData} from './helpers';
import {getDocumentDimensions} from './helpers';
import {getModalContainer} from './helpers';
import {VerticalRule} from './VerticalRule';
import {HorizontalRule} from './HorizontalRule';
import {getPixelsPerInch} from './helpers.js';

class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.horizontalPositionChange = this.horizontalPositionChange.bind(this);
        this.verticalPositionChange = this.verticalPositionChange.bind(this);
        this.onHeaderSize = this.onHeaderSize.bind(this);
        this.onFooterSize = this.onFooterSize.bind(this);
        this.header = '';
        this.body = '';
        this.footer = '';
        this.dw = '';
        
        this.state = {
            left: 0,
            top: 0,
            height: document.designData.documentHeight,
            width: document.designData.documentWidth,
            margins: document.designData.margins
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
        
        return  <div className="designContainer"> 
            <HorizontalRule left={left} width={width} horizontalPositionChange={this.horizontalPositionChange}/>
            <div className="designPanel">
                <div ref={(dw) => {this.dw = dw}} className="documentWrapper" style={designStyle}>
                    <SplitPane 
                        split="horizontal" 
                        minSize={0} 
                        onDragFinished={this.onFooterSize}
                        defaultSize={height - document.designData.footerHeight}>
                        <SplitPane 
                            split="horizontal" 
                            minSize={0} 
                            onDragFinished={this.onHeaderSize}
                            defaultSize={document.designData.headerHeight}>
                            <HeaderPanel 
                                ref={(hp) => {this.header = hp}} 
                                margins={document.designData.margins} 
                                width={width}
                                height={document.designData.headerHeight}
                                setStatus={this.props.setStatus}/>
                            <BodyPanel 
                                ref={(bp) => {this.body = bp}} 
                                margins={document.designData.margins} 
                                width={width}
                                height={height - (document.designData.headerHeight + document.designData.footerHeight)}
                                setStatus={this.props.setStatus}/>
                        </SplitPane> 
                        <FooterPanel 
                            ref={(fp) => {this.footer = fp}} 
                            margins={document.designData.margins} 
                            width={width}
                            height={document.designData.footerHeight}
                            setStatus={this.props.setStatus}/>
                    </SplitPane>
                </div>
            </div>
            <VerticalRule top={top} height={height} verticalPositionChange={this.verticalPositionChange} />
        </div>
    }
    
    onHeaderSize(sz) {
        if (sz && this.header) {
            const {height} = this.state;
            document.designData.headerHeight = sz;
            this.header.setState({height: sz});
            this.body.setState({height: height - (document.designData.headerHeight + document.designData.footerHeight)});
        }
    }
    
    onFooterSize(sz) {
        if (sz) {
            const {height} = this.state;
            document.designData.footerHeight = (height - sz);
            this.body.setState({height: height - (document.designData.headerHeight + document.designData.footerHeight)});
            this.footer.setState({height: document.designData.footerHeight});
        }
    }

    horizontalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: (-value) + 'px', top: this.dw.style.top});
            this.header.setState({height: height});
            this.body.setState({height: height - (document.designData.headerHeight + document.designData.footerHeight)});
            this.footer.setState({height: document.designData.footerHeight});
        }
    }
  
    verticalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: this.dw.style.left, top: (-value) + 'px'});
            this.header.setState({height: document.designData.headerHeight});
            this.body.setState({height: height - (document.designData.headerHeight + document.designData.footerHeight)});
            this.footer.setState({height: document.designData.footerHeight});
        }
    }
    
    refreshLayout() {
        let layout = {
            left: 0,
            top: 0, 
            height: document.designData.documentHeight,
            width: document.designData.documentWidth,
            margins: document.designData.margins
        };
        
        this.setState(layout);
    }
}

export {DesignPanel};

