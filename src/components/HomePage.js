import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignTabs } from './DesignTabs';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';
import {clearDocumentDesignData} from './helpers';
import config from '../config/appconfig.json';

var documentTree;
var statusBar;
var designTabs;
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.setTabState = this.setTabState.bind(this);
    }

    render() {
        return <div>
            <div>
                <AppToolbar setCurrentDocument={this.setCurrentDocument}/>
                    <br />
                    <SplitPane 
                        split="vertical" 
                        minSize={10} 
                        defaultSize={150}>
                        <DocumentTree ref={(dtree) => {documentTree = dtree}} 
                            setStatus={this.setStatus} 
                            setCurrentDocument={this.setCurrentDocument}
                            setTabState={this.setTabState}/>
                        <DesignTabs 
                            ref={(dtabs) => {designTabs = dtabs}} 
                            reloadDocuments={this.reloadDocuments} 
                            setStatus={this.setStatus}
                            setCurrentDocument={this.setCurrentDocument}/>
                    </SplitPane>
            </div>
            <StatusBar ref={(status) => {statusBar = status}} />
            </div>;

    }
    
    reloadDocuments() {
        documentTree.loadDocuments();
    }

    setCurrentDocument(docname) {
        if (docname) {
            designTabs.setDocumentLoaded(true);
            statusBar.setState({currentDocument: docname});
            designTabs.setState({tab0Disabled: false, tab1Disabled: false, 
                tab2Disabled: false, tab3Disabled: false, tabIndex: 0, tabStateChanged: true, selectedModel: document.designData.model});
        } else {
            clearDocumentDesignData();
            designTabs.setState({tab0Disabled: false, tab1Disabled: true, tab2Disabled: true, 
                tab3Disabled: true, tabIndex: 0, tabStateChanged: true, selectedModel: config.textmsg.modelselectdefault});
            designTabs.setDocumentLoaded(false);
            statusBar.setState({currentDocument: config.textmsg.newdocument, error: '', inf0: ''});
        }
    }
    
    setTabState(tab0State, tab1State, tab2State, tab3State) {
        designTabs.setTabState(tab0State, tab1State, tab2State, tab3State);
    }
    
    setStatus(msg, iserr) {
        if (iserr) {
            statusBar.setState({error: msg, info: ''});
        } else {
            statusBar.setState({info: msg, error: ''});
        }
    }
}

export { HomePage };