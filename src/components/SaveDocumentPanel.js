import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import {defaultSaveSettings} from './helpers';
import axios from 'axios';

const rfimage = <img alt="query folder" src="/images/report-folder.png"/>;
class SaveDocumentPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onAuthenticatorChange = this.onAuthenticatorChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        
        if (document.designData.currentDocument) {
            this.authenticator = document.designData.currentDocument.authenticator;
            this.documentName = document.designData.currentDocument.documentName.replace(/_/g, ' ');
            this.selectedGroup = document.designData.currentDocument.group;
        } else {
            this.authenticator = 'DefaultAuthorizer';
            this.documentName = 'new document';
        }
        
        
        
        this.state = {
            authorizers: '',
            groups: ''
        };

        this.loadDocumentGroups();
    }

    getIcon(props) {
        return rfimage;
    }
    
    getContent() {
        const {authorizers, groups} = this.state;
        
        if (!authorizers) {
            this.loadAuthorizers();
        }
        
        const authorizerLoop = (data) => {
            return data.map((authorizer) => {
                return <option value={authorizer}>{authorizer}</option>;
            });
        };

        return <div className="saveDocumentPanel">
            <div className="parameterInputPanel">
                <table>
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
                </table>
             </div>
            <hr />
            <div><div className="modalTreeContainer">
            {groups && 
                <Tree 
                  onSelect={this.onSelect}
                  showLine
                  icon={this.getIcon}
                  showIcon={true}
                  defaultExpandAll={true}
                  defaultSelectedKeys={this.selectedGroup}
                  treeData={groups}></Tree> }
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
            interactive: false,
            documentName: this.documentName, 
            group: this.selectedGroup, 
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
    
    loadDocumentGroups() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };

        axios.get(orm.url + '/report/document/groups', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({groups: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.setStatus(err.toString(), true);
            });

    }


}

export {SaveDocumentPanel};