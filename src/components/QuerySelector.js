import React from 'react';
import "../app/App.css";
import axios from 'axios';
import {getOrmUrl} from './helpers';

const loop = (data, qid) => {
    return data.map((item) => {
        let docid = item.key + '.' + item.documentName;
        let displayName = item.group + ': ' + item.documentName.replace(/_/g, ' ').replace('.json', '');

        if (qid && (qid === docid)) {
            return <option value={docid} selected>{displayName}</option>;
        } else {
            return <option value={docid}>{displayName}</option>;
        }
    });
};

class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            queryDocuments: ''
        };
        
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
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
        axios.get(getOrmUrl(orm.url) + '/api/report/querydocuments', config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({queryDocuments: response.data});
                } else {
                    curcomp.props.setStatus(response.statusText, true);
                }
            })
            .catch((err) => {
                curcomp.props.setStatus(err.toString(), true);
            });
    }
}

export {QuerySelector};