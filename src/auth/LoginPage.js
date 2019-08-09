import React from 'react';
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import {BaseDesignComponent} from '../components/BaseDesignComponent';
import {removeWaitMessage,getOrmUrl} from '../components/helpers';
import { withRouter } from 'react-router';

import '../app/App.css';

const loop = (data) => {
    return data.map((item) => {
        if (config.demoMode && (item.name === 'hr')) {
            return <option key="{item.name}" selected>{item.name}</option>;
        } else {
            return <option key="{item.name}">{item.name}</option>;
        }
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
        if (config.demoMode) {
            this.login('user', 'pass', orms[0], config);
        }
   }

    componentDidMount() {
        if (!config.demoMode) {
            this.username.focus();
        }
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
                        this.username.focus();
    
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
        this.login(username, password, orm, config);
    }

    render() {
        if (!config.demoMode) {
            const {username, password, orm, submitted, loading, error} = this.state;
    
            return (
                <div>
                    <h1 className="loginTitle">{config.textmsg.logintitletext}</h1>
                    <div className="errorDisplay">{error}</div>
                    <div className="login">
                        <h3>Design Login</h3>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div>
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
                            <div><label>{config.textmsg.password}</label>
                                <input type="password" name="password" defaultValue={password}
                                       onBlur={this.handleChange}/>
                                {submitted && !password &&
                                <div className="errorDisplay">*{config.textmsg.passwordrequired}</div>
                                }
                            </div>
                            <div>
                                <label>{config.textmsg.targetorm}</label>
                                <select name="orm" onChange={this.handleChange}>
                                    <option/>
                                    {options}</select>
                        
                                {submitted && !orm &&
                                <div className="errorDisplay">*{config.textmsg.targetormrequired}</div>
                                }
                            </div>
                            <div>
                                <input type="submit" disabled={loading} value={config.textmsg.login}/>
                            </div>
                
                        </form>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }

    login(username, password, selectedOrm, cfg) {
        this.showWaitMessage(cfg.textmsg.authenticating);
        const curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        const config = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache'}
        };

        localStorage.removeItem('orm');
        selectedOrm.authString = authString;
        
        const orm = selectedOrm;
        const instance = axios.create({baseURL: getOrmUrl(orm.url)});
        instance.get('/api/query/login', config)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('orm', JSON.stringify(orm));
                        curcomp.props.history.push('/');
                        removeWaitMessage();
                    } else {
                        removeWaitMessage();
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