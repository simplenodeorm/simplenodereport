import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'rc-tree';
import '../app/App.css';
import './defaultTree.css';
import groups from '../config/document-groups.json';
import {BaseDesignComponent} from './BaseDesignComponent';
import axios from 'axios';
import {clearContextMenu} from './helpers';
import {getContextMenu} from './helpers';
import {updateState} from './HomePage';
const qdimage = <img alt="query document" src="/images/querydoc.png"/>;
const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class DocumentTree extends BaseDesignComponent {
     constructor(props) {
        super(props);
        
        this.state = {
            selectedDocument: ''
        };

        this.loadDocuments();
        this.onRightClick = this.onRightClick.bind(this);
        this.editDocument = this.editDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
    }
    
    getIcon(props) {
        if (props.isLeaf) {
            return qdimage;
        } else {
            return qfimage;
        }
    }

    render() {
        const {documents} = this.state;
        if (documents) {
            let treeData = JSON.parse(JSON.stringify(groups));
            this.traverseDocumentGroups(treeData,  documents);
            
            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  showLine
                  showIcon={true}
                  icon={this.getIcon}
                  defaultExpandAll={true}
                  treeData={treeData}></Tree></div>;

        } else {
            return <div className="treeContainer"></div>
        }
    }
    
    traverseDocumentGroups(grp,  documents) {
        if (!grp.isLeaf) {
            let canRecurse = grp.children;
            let docs = documents[grp.key];
            if (docs) {
                if (!grp.children) {
                    grp.children = [];
                    canRecurse = false;
                } 
                
                for (let j = 0; j < docs.length; ++j) {
                    let leaf = {
                        title: docs[j].replace(/_/g, ' ').replace('.json', ''),
                        isLeaf: true,
                        key: (grp.key + '.' + docs[j])
                    };
                    grp.children.push(leaf);
                    
               }
            }

            if (canRecurse) {
                for (let i = 0; i < grp.children.length; ++i) {
                    this.traverseDocumentGroups(grp.children[i], documents);
                }
            }
        }
    }


    
    onRightClick(info) {
        const tree = this;
        if (info.node.props.isLeaf) {
            this.state.selectedDocument = info.node.props.eventKey;
            const cm = getContextMenu(info);
            ReactDOM.render(<ul><li><a href="#" onClick={tree.editDocument}>Edit Document</a></li><li><a href="#" onClick={tree.deleteDocument}>Delete Document</a></li></ul>, cm);
        } 
    }
    
    editDocument() {
        const curcomp = this;
        clearContextMenu();
        let {selectedDocument} = this.state;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/loaddocument/' + selectedDocument, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.loadDocumentData(response.data)
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });
    }

    deleteDocument() {
        let {selectedDocument} = this.state;
        let pos = selectedDocument.indexOf('.');
        let response = window.confirm('Delete document ' + selectedDocument.substring(pos+1).replace('_', ' ').replace('.json', '') + '?');
        if (response) {
            const curcomp = this;
            const orm = JSON.parse(localStorage.getItem('orm'));
            const config = {
                headers: {'Authorization': orm.authString}
            };

            axios.get(orm.url + '/design/deletedocument/' + selectedDocument, config)
                .then((response) => {
                    if (response.status === 200) {
                        curcomp.loadDocuments()
                        curcomp.props.setStatus('document deleted', false);
                    } else {
                        curcomp.props.setStatus(response.statusText, true);
                    }
                })
                .catch((err) => {
                    curcomp.props.setStatus(err.toString(), true);
                });
        }
        this.state.selectedDocument = '';
        
        clearContextMenu();
    }
    
    loadDocuments() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/documents', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({documents: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.setStatus(err.toString(), true);
            });

    }
    
    loadDocumentData(doc) {
        this.showWaitMessage('Loading model hierarchy...');
        const curcomp = this;
        const seldoc = doc
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        curcomp.setState({model: seldoc.document.rootModel});
        axios.get(orm.url + '/design/modeltree/' + seldoc.document.rootModel, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setCurrentDocument(seldoc, response.data);
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
                
                curcomp.clearWaitMessage();
            })
            .catch((err) => {
               curcomp.props.setStatus('' + err, true);
               curcomp.clearWaitMessage();
            });     
    }

    setCurrentDocument(doc, data) {
        document.designData.modelHierarchy = data;
        document.designData.currentDocument = doc;
        document.designData.whereComparisons = doc.document.whereComparisons;
        document.designData.selnodes = [];
        document.designData.selectedObjectKeys = [];
        
        for (let i = 0; i < doc.document.selectedColumns.length; ++i) {
            let selnode = this.findNode(document.designData.modelHierarchy, doc.document.selectedColumns[i].path);
            if (selnode) {
                selnode.__path__ = doc.document.selectedColumns[i].path;
                selnode.__columnLabel = doc.document.selectedColumns[i].label;
                selnode.__selectedFunction = doc.document.selectedColumns[i].function;
                selnode.__sortPosition = doc.document.selectedColumns[i].sortPosition;
                selnode.__sortDescending = doc.document.selectedColumns[i].sortDescending;
                selnode.__customColumnInput = doc.document.selectedColumns[i].customInput;
                document.designData.selnodes.push(selnode);
                document.designData.selectedObjectKeys.push(selnode.key);
            }
        }

        this.clearWaitMessage();
        this.props.setCurrentDocument(doc.documentName);
    }
    
    findNode(node, path) {
        let retval;
        let parts = path.split('\.');
        let curnode = node;
        if (parts.length > 1) {
            for (let i = 0; curnode && (i < (parts.length-1)); ++i) {
                for (let j = 0; j < curnode.children.length; ++j) {
                    if (curnode.children[j].title === parts[i]) {
                        curnode = curnode.children[j];
                        break;
                    }
                }
            }
        }
        
        for (let i = 0; i < curnode.children.length; ++i) {
            if (curnode.children[i].title === parts[parts.length-1]) {
                retval = curnode.children[i];
                break;
            }
        }
        
        return retval;
    }
}




export { DocumentTree };
