import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import RunReportLoginPage from '../auth/RunReportLoginPage';
import {ReportContainer} from '../components/ReportContainer';
import uuid from 'uuid';
import './App.css';

const millisPerDay = 1000 * 60 * 60 * 24;

class App extends React.Component  {
    onUnload() {
    }

    componentDidMount() {
        let lastLogin = localStorage.getItem('lastLogin');
        if (!lastLogin || ((new Date().getMilliseconds() - Number(lastLogin)) > millisPerDay)) {
            localStorage.removeItem('auth');
            localStorage.removeItem('my-session');
            localStorage.removeItem('lastLogin');
        }

        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    render() {
        if (document.location.pathname.startsWith('/runreport')) {
            document.runReportMode = true;
            document.reportId = document.location.pathname.substring('/runreport'.length + 1);
        }

        return (<div>
            <Router>
                <div>
                    {!document.runReportMode && <PrivateRoute exact path="/" component={HomePage}/>}
                    {!document.runReportMode && <Route path="/login" component={LoginPage}/>}
                    {document.runReportMode && <PrivateRoute path="/" component={ReportContainer}/>}
                    {document.runReportMode && <Route path="/login" component={RunReportLoginPage}/>}
                </div>
            </Router>
        </div>);
    }
}



export { App };
