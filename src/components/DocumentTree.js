/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'rc-tree';
import '../app/App.css';
import config from '../config/appconfig.json';
import './defaultTree.css';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from 'axios';
import {
    clearContextMenu,
    clearDocumentDesignData,
    copyObject,
    getContextMenu,
    removeWaitMessage,
    getServerContext,getRequestHeaders} from './helpers';
const rdimage = <img alt="report document" src="/images/report-document.png"/>;
const rfimage = <img alt="report folder" src="/images/report-folder.png"/>;

class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedDocument: '',
            groups: ''
        };

        this.loadDocumentGroups();
        this.onRightClick = this.onRightClick.bind(this);
        this.loadDocument = this.loadDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.setCurrentReport = this.setCurrentReport.bind(this);
    }
    
    getIcon(props) {
        if (props.isLeaf) {
            return rdimage;
        } else {
            return rfimage;
        }
    }

    render() {
        const {groups} = this.state;
        if (groups) {
            let treeData = copyObject(groups);

            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  showLine
                  showIcon={true}
                  icon={this.getIcon}
                  defaultExpandAll={true}
                  treeData={treeData}/></div>;

        } else {
            return <div className="treeContainer"/>;
        }
    }
    
    onRightClick(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = getContextMenu(info);
            ReactDOM.render(<ul><li><button onClick={tree.loadDocument}>{config.textmsg.loaddocument}</button></li>{!config.demoMode && <li><button onClick={tree.deleteDocument}>{config.textmsg.deletedocument}</button></li>}</ul>, cm);
        } 
    }
    
    loadDocument() {
        clearContextMenu();
        const curcomp = this;
        let {selectedDocument} = this.state;
        const httpcfg = {
            headers: getRequestHeaders()
        };

        axios.get(getServerContext() + '/api/report/load/' + selectedDocument, httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.loadDocumentData(response.data);
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });
    }

    deleteDocument() {
        clearContextMenu();
        const curcomp = this;
        let {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');

        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
            const httpcfg = {
                headers: getRequestHeaders()
            };

            axios.get(getServerContext() + '/api/report/delete/' + selectedDocument, httpcfg)
                .then((response) => {
                    if (response.status === 200) {
                        curcomp.loadDocumentGroups();
                        curcomp.props.setStatus('document deleted', false);
                    } else {
                        curcomp.props.setStatus(response.statusText, true);
                    }
                })
                .catch((err) => {
                    curcomp.props.setStatus(err.toString(), true);
                });
        }
       clearContextMenu();
       curcomp.setState({selectedDocument: ''});
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        const httpcfg = {
            headers: getRequestHeaders()
        };

        axios.get(getServerContext() + '/api/report/document/groups', httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({groups: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });

    }

    loadDocumentData(doc) {
        clearDocumentDesignData();
        this.props.getDesignPanel().removeAllReportObjects();
        this.props.getDesignPanel().refreshLayout(doc);
        this.props.getToolbar().setState({canSave: true, canAddObject: true});
    }

    setCurrentReport(doc) {
        removeWaitMessage();
        this.props.setCurrentReport(doc.documentName);
    }
    
}

export { DocumentTree };
