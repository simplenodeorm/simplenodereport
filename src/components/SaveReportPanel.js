import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import axios from 'axios';

const rfimage = <img alt="query folder" src="/images/report-folder.png"/>;
class SaveReportPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onReportName = this.onReportName.bind(this);
        
        this.selectedGroup = document.designData.currentReport.group;
        this.reportName = document.designData.currentReport.reportName.replace(/_/g, ' ');
        this.state = {
            groups: ''
        };

        this.loadDocumentGroups();
    }

    getIcon() {
        return rfimage;
    }
    
    getContent() {
        const {authorizers, groups} = this.state;
        
        if (!authorizers) {
            this.loadAuthorizers();
        }
        
        const authorizerLoop = (auth, data) => {
            return data.map((authorizer) => {
                if (auth === authorizer) {
                    return <option value={authorizer} selected>{authorizer}</option>;
                } else {
                    return <option value={authorizer}>{authorizer}</option>;
                }
            });
        };

        return <div className="saveReportPanel">
            <div className="parameterInputPanel">
                <table>
                    <tr>
                        <td className="inputLabel">{config.textmsg.documentnamelabel}</td>
                        <td><input type="text"
                            defaultValue={this.reportName}
                            onChange={this.onReportName} /></td>
                    </tr>
                </table>
             </div>
            <hr />
                <div className="modalTreeContainer">
                {groups && 
                    <Tree 
                      onSelect={this.onSelect}
                      showLine
                      icon={this.getIcon}
                      showIcon={true}
                      defaultExpandAll={true}
                      defaultSelectedKeys={this.selectedGroup}
                      treeData={groups}/> }
                </div>
        </div>;
    }
    
    onSelect(selkey) {
        this.selectedGroup = selkey;
    }
    
    onReportName(e) {
        this.reportName = e.target.value;
    }
    
    getTitle() {
        return config.textmsg.savedocumenttitle;
    }
        
    isComplete() {
        return (this.selectedGroup);
    }
    
    getError() { 
        this.state.error = false;
        return 'Please select a folder and complete all required entries';
    }

    getResult() {
        return { 
            group: this.selectedGroup, 
            reportName: this.reportName
        };
    }
    
    loadDocumentGroups() {
        const curcomp = this;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth')}
        };

        axios.get(config.apiServerUrl + '/api/report/document/groups', httpcfg)
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

export {SaveReportPanel};