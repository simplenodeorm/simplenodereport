import React from 'react';
import orms from '../config/orms.json';
import config from '../config/runreportconfig.json';
import base64 from 'base-64';
import axios from 'axios';
import {BaseDesignComponent} from '../components/BaseDesignComponent';
import {removeWaitMessage} from '../components/helpers';
import { withRouter } from 'react-router';
import '../app/RunReport.css';

class LoginPage extends BaseDesignComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            orm: this.findOrm(document.reportId.split('.')[0]),
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
        this.login(username, password, orm, config);
    }
    

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    
    findOrm(ormName) {
        let retval;
        for (let i = 0; i < orms.length; ++i) {
            if (orms[i].name === ormName) {
                retval = orms[i];
                break;
            }
        }
    
        return retval;
    }
    
    render() {
        const {username, password, orm, submitted, loading, error} = this.state;

        return (
            <div>
                <h1 className="loginTitle">{config.textmsg.logintitletext}</h1>
                <div className="errorDisplay">{error}</div>
                <div className="login">
                    <h3>{config.textmsg.reportlogin}</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="username">{config.textmsg.username}</label>
                            <input type="text" name="username" defaultValue={username} onBlur={this.handleChange} />
                            {submitted && !username &&
                                <div className="errorDisplay">*{config.textmsg.usernamerequired}</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">{config.textmsg.password}</label>
                            <input type="password" name="password" defaultValue={password} onBlur={this.handleChange} />
                            {submitted && !password &&
                                <div className="errorDisplay">*{config.textmsg.passwordrequired}</div>
                            }
                        </div>
                        <div>
                            <label>ORM</label>
                            <input type="text" name="orm" defaultValue={orm.name} disabled={true}/>

                        </div>
                        <div>
                            <input type="submit" disabled={loading} value={config.textmsg.login}/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    login(username, password, selectedOrm, cfg) {
        this.showWaitMessage(cfg.textmsg.authenticating);
        const curcomp = this;
        const authString = 'Basic ' + base64.encode(username + ':' + password);
        const config = {
            headers: {'Authorization': authString, 'Cache-Control': 'no-cache'}
        };

        localStorage.removeItem('orm');
        
        const {orm} = this.state;
        orm.authString = authString;
        const instance = axios.create({baseURL: orm.url});
        instance.get('/design/login', config)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('orm', JSON.stringify(orm));
                        curcomp.props.history.push('/');
                    } else {
                        curcomp.setState({error: response.statusText, loading: false, submitted: false});
                    }
                    removeWaitMessage();
                })
                .catch((err) => {
                    removeWaitMessage();
                    curcomp.setState({error: err.toString(), loading: false, submitted: false});
                });
    }

    logout() {
        localStorage.removeItem('orm');
    }
}

export default withRouter(LoginPage);