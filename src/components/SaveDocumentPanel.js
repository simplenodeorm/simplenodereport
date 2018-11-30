import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import groups from '../config/document-groups.json';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import {defaultSaveSettings} from './helpers';
import axios from 'axios';

const qfimage = <img alt="query folder" src="/images/queryfolder.png"/>;

class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onAuthenticatorChange = this.onAuthenticatorChange.bind(this);
        this.onResultFormatChange = this.onResultFormatChange.bind(this);
        this.onDistinctChange = this.onDistinctChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        
        if (document.designData.currentDocument) {
            this.distinct = document.designData.currentDocument.distinct;
            this.resultFormat = document.designData.currentDocument.resultFormat; 
            this.authenticator = document.designData.currentDocument.authenticator;
            this.documentName = document.designData.currentDocument.documentName.replace(/_/g, ' ');
            this.selectedGroup = document.designData.currentDocument.group;
        } else {
            this.distinct = false;
            this.resultFormat = 'object'; 
            this.authenticator = 'DefaultAuthorizer';
            this.documentName = 'new document';
        }
        
        
        
        this.state = {
            authorizers: ''
        };

    }

    getIcon(props) {
        return qfimage;
    }
    
    getContent() {
        const {authorizers} = this.state;
        
        if (!authorizers) {
            this.loadAuthorizers();
        }
        
        const authorizerLoop = (data) => {
            return data.map((authorizer) => {
                return <option value={authorizer}>{authorizer}</option>;
            });
        };

        let formatSelect = <select onChange={this.onResultFormatChange}><option value='object' selected>object graph</option><option value='result set'>result set</option></select>;
        if ( document.designData.currentDocument &&  (document.designData.currentDocument.resultFormat === 'result set')) {
            formatSelect = <select onChange={this.onResultFormatChange}><option value='object'>object graph</option><option value='result set' selected>result set</option></select>;
            this.resultFormat = 'result set';
        }
        return <div className="saveDocumentPanel">
            <div className="parameterInputPanel">
                <table>
                    <tr>
                    <td className="inputLabel">{config.textmsg.resultformatlabel}</td>
                        <td>
                            {formatSelect}
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">{config.textmsg.authenticatorlabel}</td>
                        <td>
                            <select onChange={this.onAuthenticatorChange}>
                                {authorizers && authorizerLoop(authorizers) } 
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputLabel">{config.textmsg.documentnamelabel}</td>
                        <td><input type="text" onBlur={this.onNameChange} defaultValue={this.documentName} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;<input onChange={this.onDistinctChange} type="checkbox" defaultValue={this.distinct}/>{config.textmsg.distinct}</td>
                    </tr>
                </table>
             </div>
            <hr />
            <div><div className="modalTreeContainer">
                <Tree 
                  onSelect={this.onSelect}
                  showLine
                  icon={this.getIcon}
                  showIcon={true}
                  defaultExpandAll={true}
                  defaultSelectedKeys={this.selectedGroup}
                  treeData={groups}></Tree>
            </div></div>
        </div>;
    }
    
    onSelect(selkey) {
        this.selectedGroup = selkey;
    }
    
    onNameChange(e) {
        this.documentName = e.target.value;
    }
    
    onAuthenticatorChange(e) {
        this.authenticator = e.target.value;
    }
    
    onResultFormatChange(e) {
        this.resultFormat = e.target.value;
    }

    onDistinctChange(e) {
        this.distinct = e.target.checked;
    }
    
    getTitle() {
        return config.textmsg.savedocumenttitle;
    }
        
    isComplete() {
        let retval = (this.documentName && this.selectedGroup && this.authenticator);
        return retval;
    }
    
    getError() { 
        this.state.error = false;
        return 'Please select a folder and complete all required entries';
    }

    getResult() {
        return { 
            interactice: false,
            documentName: this.documentName, 
            group: this.selectedGroup, 
            distinct: this.distinct, 
            resultFormat: this.resultFormat, 
            authenticator: this.authenticator
        };
    }
    
    
    loadAuthorizers() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/design/authorizers', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({authorizers: response.data});
                } else {
                    curcomp.setState({error: response.statusText});
                }
            })
            .catch((err) => {
                curcomp.setState({error: err.toString()});
            });
    }

}

export {SaveDocumentPanel};