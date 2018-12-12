import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignPanel } from './DesignPanel';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import defaults from '../config/defaults.json';
import '../app/App.css';
import config from '../config/appconfig.json';
import {getPixelsPerInch} from './helpers.js';
import {getDocumentDimensions} from './helpers';

const ppi = getPixelsPerInch();

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        let myPreferences = JSON.parse(localStorage.getItem('preferences'));
        
        if (!myPreferences || !myPreferences.documentSize) {                        
            myPreferences = defaults;
        } else {
            for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
                if (!myPreferences[config.defaultPreferenceNames[i]]) {
                    myPreferences[config.defaultPreferenceNames[i]] = defaults[config.defaultPreferenceNames[i]];
                }
            }
        }

        // set document default
        if (!document.designData.documentHeight) {
            let dim = getDocumentDimensions(myPreferences.documentSize);
            document.designData.documentWidth = (ppi * dim[0]);
            document.designData.documentHeight = (ppi * dim[1]);
            document.designData.margins = [ppi * myPreferences.marginLeft, ppi * myPreferences.marginTop, ppi * myPreferences.marginRight, ppi * myPreferences.marginBottom];
            document.designData.footerHeight = ppi;
            document.designData.headerHeight = ppi;
            document.designData.font = myPreferences.font;
            document.designData.fontSize = myPreferences.fontSize;
            document.designData.fontFamily = myPreferences.fontFamily;
        }
    
        this.getDesignPanel = this.getDesignPanel.bind(this);
        this.setDesignPanel = this.setDesignPanel.bind(this);
        this.getDocumentTree = this.getDocumentTree.bind(this);
        this.setDocumentTree = this.setDocumentTree.bind(this);
        this.getStatusBar = this.getStatusBar.bind(this);
        this.setStatusBar = this.setStatusBar.bind(this);
        this.reloadDocuments = this.reloadDocuments.bind(this);
        this.setCurrentDocument = this.setCurrentDocument.bind(this);
    }

    render() {
        const curobj = this
    
        return <div>
            <div>
                <AppToolbar 
                    getDocumentTree={curobj.getDocumentTree}  
                    getDesignPanel={curobj.getDesignPanel}  
                    getStatusBar={curobj.getStatusBar}  
                    setCurrentDocument={this.setCurrentDocument}/>
                <br />
                <SplitPane 
                    split="vertical" 
                    minSize={0} 
                    defaultSize={150}>
                    <DocumentTree ref={(dt) => {curobj.setDocumentTree(dt) }} 
                        toolBar={this.toolBar}
                        setStatus={this.setStatus} 
                        setCurrentDocument={this.setCurrentDocument} />
                    <DesignPanel ref={(dp) => {curobj.setDesignPanel(dp) }} />
                </SplitPane>
            </div>
            <StatusBar ref={(sb) => {curobj.setStatusBar(sb)}} />
            </div>;

    }
    
    getDesignPanel() {
        return this.designPanel;
    }
    
    setDesignPanel(dp) {
        this.designPanel = dp;
    }

    getDocumentTree() {
        return this.documentTree;
    }
    
    setDocumentTree(dt) {
        this.documentTree = dt;
    }
    
    getStatusBar() {
        return this.statusBar;
    }
    
    setStatusBar(sb) {
        this.statusBar = sb;
    }
                    
    reloadDocuments() {
        this.toolBar.getDocumentTree().loadDocuments();
    }

    setCurrentDocument(docname) {
        if (docname) {
            this.statusBar.setState({currentDocument: docname});
        } else {
            this.statusBar.setState({currentDocument: config.textmsg.newdocument, error: '', inf0: ''});
        }
    }
    
    setStatus(msg, iserr) {
        if (iserr) {
            this.statusBar.setState({error: msg, info: ''});
        } else {
            this.statusBar.setState({info: msg, error: ''});
        }
    }
}

export { HomePage };