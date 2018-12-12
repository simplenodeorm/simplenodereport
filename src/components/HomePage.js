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

var documentTree;
var statusBar;

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
    }

    render() {
        return <div>
            <div>
                <AppToolbar setCurrentDocument={this.setCurrentDocument}/>
                    <br />
                    <SplitPane 
                        split="vertical" 
                        minSize={0} 
                        defaultSize={150}>
                        <DocumentTree ref={(dtree) => {documentTree = dtree}} 
                            setStatus={this.setStatus} 
                            setCurrentDocument={this.setCurrentDocument} />
                        <DesignPanel/>
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
            statusBar.setState({currentDocument: docname});
        } else {
            statusBar.setState({currentDocument: config.textmsg.newdocument, error: '', inf0: ''});
        }
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