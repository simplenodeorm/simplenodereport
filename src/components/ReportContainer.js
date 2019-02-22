import React from 'react';
import '../app/App.css';
import axios from "axios";
import {removeWaitMessage} from "./helpers";

class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div><h1 style={{color: "white"}}>tester</h1></div>;
    }
    
    run() {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
        axios.get(orm.url + '/report/run/', config)
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

export { ReportContainer };