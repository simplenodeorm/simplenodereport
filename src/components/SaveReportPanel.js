/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import config from '../config/appconfig.json';
import {ModalDialog} from './ModalDialog';
import{getServerContext,getRequestHeaders} from './helpers';
import Tree from 'rc-tree';
import './defaultTree.css';
import "../app/App.css";
import axios from 'axios';

const rfimage = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAScwAAEnMBjCK5BwAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS40E0BoxAAAAtVJREFUOE+t03tIU1EcwPFTkARKkblUsE3H3MQU8jExGBlKouh8UBRIYRFIhFD4SK1oJUVLyRLNfKS21KmjTDOy+Wg+mjrb1AzRUirfm7OUWO3tr9+clZJQf3Tgw7ncy/3ec+Bc8l+GONvR9lkWxakpx8H5MRLlU+zw9ibr07+M9jyWt7SELu4XMhQD1e6KgVqGQiqgFbYUUOkiPn37hnieNquvE9JdwoibEe/VaV8HgG4gYNnwlr2s7PLSSMtcBySF1N51Sqi9bcXU3hf5LrznufbbVgLtBW5x00999V9a2aBq9oP5Nn9Qd7BhoYsNn6U4o/muAFB1BIKq02qwxlcu5vsdfpjsaItboMeOVfno+ov2wKQkGGZ7YmCm9yTMyM6hdJiWXYRZ+RVQvbmB+CuUg3zz+MuUhboMRhBpznGL6Mvz1vbc9QL9Ry6YZg+Bae4YGFWJYFBfRfdAr65ENesoB7O1dakeQUSc4xralOnxXV7qC8axCDBNYGQ6GkOxGDqCoVMYubwaEv4KTPbwvtZf8PInDdnUYFEa49tIDQf0Q5FgHI0E0ziyrGYyajV2GIzKeDCokjCUhYH78K4pcbL+EotF6vi7OYIkN83EkxDQyaJAL+eCfpALhmHu79gnjE1hbCYGV3UUYwmgqDygEKXQnEgtzyWgKp2umW0MBd2rKNBJUQ/qQ/0YGsLQCEbG0AdkWdVUNHTccZeIzuCBE2Y6+DRcY2rUTWHWwE+WUDeScUGnsIYMw7jF95GgHQ2Hztvuj8rjaVsJ/7R9YOstz6W5xoPmxZbwjbUhSZh5sTPcvNQdZlZKgk2tN90zixLIFrLf19b7+gmX3OKzzOrSJKvyZGZVWTJTaGG5FqSyKirOswSVaawHFelMQWUGs4h/3JnD45HNlsNo42RHKGwacdpHJ7s4DEJZK4hJHCxCPMjOUE9ib5kjvMkOPz/8+prxb3/eH4OQH1a2+ZFs8M3dAAAAAElFTkSuQmCC" alt="folder" />;

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
        const {groups} = this.state;
        
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
            headers: getRequestHeaders()
        };

        axios.get(getServerContext() + '/api/report/document/groupsonly', httpcfg)
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