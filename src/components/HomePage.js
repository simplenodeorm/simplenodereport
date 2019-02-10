import React from 'react';
import SplitPane from 'react-split-pane';
import { DocumentTree } from './DocumentTree';
import { DesignPanel } from './DesignPanel';
import {AppToolbar} from './AppToolbar';
import {StatusBar} from './StatusBar';
import '../app/App.css';
import {getPixelsPerInch} from './helpers.js';
import {loadDefaultDocumentSettings} from './helpers';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // if new set document defaults
        if (!document.designData.currentReport.reportName) {
            loadDefaultDocumentSettings();
        }
        
        this.setStatus = this.setStatus.bind(this);
        this.reloadDocuments = this.reloadDocuments.bind(this);
        this.setCurrentReport = this.setCurrentReport.bind(this);
        this.refreshLayout = this.refreshLayout.bind(this);
        this.getDesignPanel = this.getDesignPanel.bind(this);
        this.getToolbar = this.getToolbar.bind(this);
        this.setStatusBar = this.setStatusBar.bind(this);
    }

    reloadDocuments() {
        this.documentTree.loadDocuments();
    }

    setCurrentReport(report) {
        if (this.statusBar) {
            this.statusBar.setState({currentReport: report, error: '', info: ''});
        }
    }
    
    setStatusBar(sb) {
        if (sb) {
            this.statusBar = sb;
        }
    }
    
    setStatus(msg, iserr) {
        if (this.statusBar) {
            if (iserr) {
                this.statusBar.setState({error: msg, info: ''});
            } else {
                this.statusBar.setState({info: msg, error: ''});
            }
        }
    }

    render() {
        const curobj = this;
    
        return <div><div>
                <AppToolbar
                    ref={(tb) => {curobj.toolbar = tb;}}
                    setStatus={curobj.setStatus}
                    reloadDocuments={curobj.reloadDocuments}
                    getDesignPanel={curobj.getDesignPanel}
                    refreshLayout={curobj.refreshLayout}/>
                <br />
                <SplitPane 
                    split="vertical" 
                    minSize={0} 
                    defaultSize={150}>
                    <DocumentTree ref={(dt) => {curobj.documentTree = dt;}}
                        getToolbar={curobj.getToolbar}
                        setStatus={curobj.setStatus} 
                        setCurrentReport={curobj.setCurrentReport}
                        getDesignPanel={this.getDesignPanel} />
                    <DesignPanel ref={(dp) => {curobj.setDesignPanel(dp);}}
                        getToolbar={curobj.getToolbar}
                        setCurrentReport={curobj.setCurrentReport}/>
                </SplitPane>
            </div>
            <StatusBar ref={(sb) => {curobj.setStatusBar(sb);}} />
            </div>;
    }
    
    setDesignPanel(dp) {
        this.designPanel = dp;
    }

    getDesignPanel() {
        return this.designPanel;
    }
    
    getToolbar() {
         return this.toolbar;
    }

    refreshLayout(doc) {
        return this.designPanel.refreshLayout(doc);
    }
    
}

export { HomePage };