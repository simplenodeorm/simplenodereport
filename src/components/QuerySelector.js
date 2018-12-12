import React from 'react';
import "../app/App.css";
import axios from 'axios';

const loop = (data) => {
    return data.map((item) => {
        let key = item.key + ':' + item.documentName;
        let val = item.group + ':' + item.documentName.replace('.json', '');
        return <option value={key}>{val}</option>;
    });
};

class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
        this.setBackingQuery = this.setBackingQuery.bind(this);
        
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
            <select style={myStyle} onChange={this.setBackingQuery}>
                <option></option>
                {queryDocuments && loop(queryDocuments)}
            </select>
        </div>
    }
    
    setBackingQuery(e) {
        
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