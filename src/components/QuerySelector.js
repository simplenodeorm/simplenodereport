import React from 'react';
import "../app/App.css";
import config from '../config/appconfig.json';
import axios from 'axios';

const loop = (data, qid) => {
    return data.map((item) => {
        if (qid && (qid === item.docid)) {
            return <option value={item.docid} selected>{item.displayName}</option>;
        } else {
            return <option value={item.docid}>{item.displayName}</option>;
        }
    });
};

class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            queryDocuments: ''
        };
        this.convertToList = this.convertToList.bind(this);
        this.loadAvailableQueryDocuments();
    }
    
    render() {
        const {queryDocuments} = this.state;
        let myStyle = {
            width: '225px'
        };
        
        return <div>
            <select style={myStyle} onChange={this.props.setQuery}>
                <option/>
                {queryDocuments && loop(queryDocuments, this.props.queryId)}
            </select>
        </div>
    }
    
    loadAvailableQueryDocuments() {
        const curcomp = this;
        const httpcfg = {
            headers: {'Authorization': localStorage.getItem('auth')}
        };

        axios.get(config.apiServerUrl + '/api/query/document/groups', httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    let list = [];
                    curcomp.convertToList(response.data, list);
                    list.sort();
                    curcomp.setState({queryDocuments: list});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });
    }

    convertToList(node, list)  {
        if (node.children) {
            for (let i = 0; i < node.children.length; ++i) {
                if (node.children[i].isLeaf) {
                    let displayName = node.title + ': ' + node.children[i].title;
                    list.push({docid: node.children[i].key.replace('.json', ''), displayName: displayName});
                } else {
                    this.convertToList(node.children[i], list);
                }
            }
        }
    }
}


export {QuerySelector};