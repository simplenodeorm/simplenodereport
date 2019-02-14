import React from 'react';
import "../app/App.css";
import axios from 'axios';

const loop = (data, qid) => {
    return data.map((item) => {
        let docid = item.key + ':' + item.documentName;
        if (qid && (qid === docid)) {
            return <option value={docid} selected>{docid.replace(/_/g, ' ').replace('.json', '')}</option>;
        } else {
            return <option value={docid}>{docid.replace(/_/g, ' ').replace('.json', '')}</option>;
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
        axios.get(orm.url + '/report/querydocuments', config)
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