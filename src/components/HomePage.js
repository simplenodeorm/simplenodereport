import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignPanel } from './DesignPanel';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';
import config from '../config/appconfig.json';

var documentTree;
var statusBar;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
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