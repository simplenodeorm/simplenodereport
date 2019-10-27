/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../app/App.css';
import {DocumentTree} from '@simplenodeorm/simplenodeclientbase/lib/DocumentTree';
import {copyObject,clearDocumentDesignData} from './helpers';
import config from '../config/appconfig.json';

const rdimage = <img alt="report document" src="/images/report-document.png"/>;
const rfimage = <img alt="report folder" src="/images/report-folder.png"/>;

class ReportDocumentTree extends DocumentTree {
     constructor(props) {
        super(props);
        this.loadDocument = this.loadDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.setCurrentReport = this.setCurrentReport.bind(this);
    }

    getFolderImage() {
        return rfimage;
    }

    getDocumentImage() {
        return rdimage;
    }

    getConfig() {
        return config;
    }

    showRightClickMenu(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = this.getContextMenu(info);
            ReactDOM.render(<ul><li><button onClick={tree.loadDocument}>{config.textmsg.loaddocument}</button></li>{!config.demoMode && <li><button onClick={tree.deleteDocument}>{config.textmsg.deletedocument}</button></li>}</ul>, cm);
        } 
    }
    
    loadDocument() {
        this.clearContextMenu();
        const curcomp = this;
        const {selectedDocument} = this.state;
        this.sendRequest('/api/report/load/' + selectedDocument,
            (data) => {
                curcomp.loadDocumentData(data);
           },
            (err) => {
                curcomp.props.setStatus(curcomp.formatError(err), true);
            });
    }

    deleteDocument() {
        this.clearContextMenu();
        const curcomp = this;
        const {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');

        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
           this.sendRequest('/api/report/delete/' + selectedDocument,
                (data) => {
                    curcomp.props.setStatus('document deleted', false);
                    curcomp.loadDocumentGroups();
                },
                (err) => {
                    curcomp.props.setStatus(curcomp.formatError(err), true);
                });

        }
       this.clearContextMenu();
       curcomp.setState({selectedDocument: ''});
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        this.sendRequest( '/api/report/document/groups',
            (data) => {
                curcomp.setState({groups: data});
            },
            (err) => {
                curcomp.props.setStatus(curcomp.formatError(err), true);
            });
    }

    loadDocumentData(doc) {
        clearDocumentDesignData();
        this.props.getDesignPanel().removeAllReportObjects();
        this.props.getDesignPanel().refreshLayout(doc);
        this.props.getToolbar().setState({canSave: true, canAddObject: true});
    }

    setCurrentReport(doc) {
        this.removeWaitMessage();
        this.props.setCurrentReport(doc.documentName);
    }
    
}

export { ReportDocumentTree };
