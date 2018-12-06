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
import axios from 'axios';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';
import {VerticalRule} from './VerticalRule';
import {HorizontalRule} from './HorizontalRule';
import {getPixelsPerInch} from './helpers.js';

class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.horizontalPositionChange = this.horizontalPositionChange.bind(this);
        this.verticalPositionChange = this.verticalPositionChange.bind(this);
        this.dw;
        
        this.state = {
            left: 0,
            top: 0
        };
    }
    
    render() {
        const {left, top} = this.state;
    
        const designStyle = {
            left: left,
            top: top,
            height: (document.designData.documentHeight + 'px'),
            width: (document.designData.documentWidth + 'px'),
        }
        
        return  <div className="designContainer"> 
            <HorizontalRule left={left} horizontalPositionChange={this.horizontalPositionChange}/>
            <div className="designPanel">
                <div ref={(dw) => {this.dw = dw}} className="documentWrapper" style={designStyle}>
                    <SplitPane 
                        split="horizontal" 
                        minSize={0} 
                        defaultSize={document.designData.documentHeight - getPixelsPerInch()}>
                        <SplitPane 
                            split="horizontal" 
                            minSize={0} 
                            defaultSize={getPixelsPerInch()}>
                            <HeaderPanel setStatus={this.props.setStatus}/>
                            <BodyPanel setStatus={this.props.setStatus}/>
                        </SplitPane> 
                        <FooterPanel setStatus={this.props.setStatus}/>
                    </SplitPane>
                </div>
            </div>
            <VerticalRule top={top} verticalPositionChange={this.verticalPositionChange}/>
        </div>
    }
    
    horizontalPositionChange(value) {
        if (this.dw) {
            this.setState({left: (-value) + 'px', top: this.dw.style.top});
        }
    }
  
    verticalPositionChange(value) {
        if (this.dw) {
            this.setState({left: this.dw.style.left, top: (-value) + 'px'});
        }
    }
}

export {DesignPanel};

