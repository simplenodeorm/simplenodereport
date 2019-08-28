import React from 'react';
import config from '../config/runreportconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import uuid from 'uuid';
import {BaseDesignComponent} from '../components/BaseDesignComponent';
import {removeWaitMessage,getServerContext} from '../components/helpers';
import { withRouter } from 'react-router';
import '../app/RunReport.css';

class LoginPage extends BaseDesignComponent {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
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
        this.login(username, password, config);
    }
    

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    
    render() {
        const {username, password, submitted, loading, error} = this.state;

        return (
            <div>
                <h1 className="loginTitle">{config.textmsg.logintitletext}</h1>
                <div className="errorDisplay">{error}</div>
                <div className="login">
                    <h3>{config.textmsg.reportlogin}</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div style={{paddingTop: "15px"}}>
                            <label htmlFor="username">{config.textmsg.username}</label>
                            <input type="text" name="username"
                                   ref={(input) => {
                                       this.username = input;
                                   }}
                                   defaultValue={username} onBlur={this.handleChange}/>
                            {submitted && !username &&
                            <div className="errorDisplay">*{config.textmsg.usernamerequired}</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">{config.textmsg.password}</label>
                            <input type="password" name="password" defaultValue={password}
                                   onBlur={this.handleChange}/>
                            {submitted && !password &&
                            <div className="errorDisplay">*{config.textmsg.passwordrequired}</div>
                            }
                        </div>
                        <div>
                            <input type="submit" disabled={loading} value={config.textmsg.login}/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    login(username, password, cfg) {
        this.showWaitMessage(cfg.textmsg.authenticating);
        const mySession = uuid();
        const curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        const httpcfg = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache', 'my-session': mySession}
        };

        localStorage.removeItem(cfg.appname + '-auth');
        localStorage.removeItem(cfg.appname + '-my-session');
        localStorage.removeItem(cfg.appname + '-lastLogin');

        axios.get(getServerContext() + '/api/query/login', httpcfg)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem(cfg.appname + '-auth', authString);
                    localStorage.setItem(cfg.appname + '-lastLogin', new Date().getTime());
                    localStorage.setItem(cfg.appname + '-my-session', mySession);
                    curcomp.props.history.push('/');
                    removeWaitMessage();
                } else  {
                    curcomp.setState({error: cfg.textmsg.invalidlogin, loading: false, submitted: false});
                }
            })
            .catch((err) => {
                curcomp.setState({error: cfg.textmsg.invalidlogin, loading: false, submitted: false});
            });
    }

    logout() {
        localStorage.removeItem(config.appname + '-auth');
        localStorage.removeItem(config.appname + '-my-session');
        localStorage.removeItem(config.appname + '-lastLogin');
    }
}

export default withRouter(LoginPage);