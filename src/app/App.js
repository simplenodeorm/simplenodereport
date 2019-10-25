/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { HomePage } from '../components/HomePage';
import {PrivateRoute} from '@simplenodeorm/simplenodeclientbase/lib/PrivateRoute';
import ReportDesignerLogin from '../auth/ReportDesignerLogin';
import './App.css';
import config from '../config/appconfig.json';

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.lastActivity = new Date().getTime();
        this.onActivity = this.onActivity.bind(this);
    }

    componentDidMount() {
        let loginTimeout = Number(config.logintimeoutminutes) * 60 * 1000;

        let lastLogin = localStorage.getItem(config.appname + '-lastLogin');
        if (!lastLogin || ((new Date().getTime() - Number(lastLogin)) > loginTimeout)) {
            localStorage.removeItem(config.appname + '-auth');
            localStorage.removeItem(config.appname + '-my-session');
            localStorage.removeItem(config.appname + '-lastLogin');
            this.setState({refresh: true});
        }
        window.addEventListener('keydown', this.onActivity);
    }

    render() {
        if (document.location.pathname.startsWith('/runreport')) {
            document.runReportMode = true;
            document.reportId = document.location.pathname.substring('/runreport'.length + 1);
        }

        return (<div>
            <Router>
                <div>
                    <Route path="/login"  render={()=>{return <ReportDesignerLogin logo={"/logo-small.png"} config={config}/>}}/>
                    <PrivateRoute exact config={config} path="/" component={HomePage} />
                </div>
            </Router>
        </div>);
    }

    onActivity() {
        let tm = new Date().getTime();
        if ((tm - this.lastActivity) > 10000) {
            if (localStorage.getItem(config.appname + '-auth')) {
                localStorage.setItem(config.appname + '-lastLogin', tm);
                this.lastActivity = tm;
            }
        }
    }
}



export { App };
