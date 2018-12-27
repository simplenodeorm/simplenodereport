import React from 'react';
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import {BaseDesignComponent} from '../components/BaseDesignComponent';

import { withRouter } from 'react-router';

import '../app/App.css';

const loop = (data) => {
    return data.map((item) => {
        return <option key="{item.name}">{item.name}</option>;
    });
};

const options = loop(orms);

class LoginPage extends BaseDesignComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            orm: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;

        if (name === "orm") {
            if (value) {
                for (let i = 0; i < orms.length; ++i) {
                    if (orms[i].name === e.target.value) {
                        this.setState({orm: orms[i]});
                        this.setState({username: orms[i].defaultUsername});
                        this.setState({password: orms[i].defaultPassword});
                        break;
                    }
                }
            } else {
                this.setState({orm: undefined});
                this.setState({username: ''});
                this.setState({password: ''});
            }
        } else {
            this.setState({[name]: value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true, error: ''});
        const {username, password, orm} = this.state;

        // stop here if form is invalid
        if (!(username && password && orm)) {
            return;
        }

        this.setState({loading: true});
        this.login(username, password, orm);
    }

    render() {
        const {username, password, orm, submitted, loading, error} = this.state;

        return (
            <div>
                <h1 className="loginTitle">{config.textmsg.logintitletext}</h1>
                <div className="errorDisplay">{error}</div>
                <div className="login">
                    <h2>Design Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="errorMessage">*Username is required</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={this.handleChange} /> 
                            {submitted && !password &&
                                <div className="errorMessage">*Password is required</div>
                            }
                        </div>
                        <div>
                            <label>Target ORM</label>
                            <select name="orm" onChange={this.handleChange}><option/>{options}</select>

                            {submitted && !orm &&
                                <div className="errorMessage">*Target ORM is required</div>
                            }
                        </div>
                        <div>
                            <input type="submit" disabled={loading} value="Login"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    login(username, password, selectedOrm) {
        this.showWaitMessage('Authenticating...');
        let curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        var config = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache'}
        };

        localStorage.removeItem('orm');
        selectedOrm.authString = authString;
        
        const orm = selectedOrm;
        const instance = axios.create({baseURL: orm.url});
        instance.get('/design/login', config)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('orm', JSON.stringify(orm));
                        curcomp.props.history.push('/');
                        curcomp.clearWaitMessage();
                    } else {
                        curcomp.setState({error: response.statusText, loading: false, submitted: false});
                    }
                })
                .catch((err) => {
                    curcomp.setState({error: err.toString(), loading: false, submitted: false});
                });
    }

    logout() {
        localStorage.removeItem('orm');
    }
}

export default withRouter(LoginPage);