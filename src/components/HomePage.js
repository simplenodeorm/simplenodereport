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
        // set document default
        if (!document.designData.documentHeight) {
            let dim = getDocumentDimensions(defaults.documentSize);
            document.designData.documentWidth = (ppi * dim[0]);
            document.designData.documentHeight = (ppi * dim[1]);
            document.designData.margins = [ppi * defaults.marginLeft, ppi * defaults.marginTop, ppi * defaults.marginRight, ppi * defaults.marginBottom];
            document.designData.footerHeight = ppi;
            document.designData.headerHeight = ppi;
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