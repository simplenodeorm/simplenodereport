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

class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return  <div> 
            <HorizontalRule/>
            <div className="designPanel">
                <SplitPane 
                    split="horizontal" 
                    minSize={0} 
                    defaultSize={350}>
                    <div>
                        <SplitPane 
                            split="horizontal" 
                            minSize={0} 
                            defaultSize={30}>
                            <HeaderPanel setStatus={this.props.setStatus}/>
                            <BodyPanel setStatus={this.props.setStatus}/>
                        </SplitPane> 
                    </div>
                    <FooterPanel setStatus={this.props.setStatus}/>
                    </SplitPane>
            </div>
            <VerticalRule/>
        </div>
    }
}

export {DesignPanel};

