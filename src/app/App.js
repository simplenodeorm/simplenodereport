import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import {ReportContainer} from '../components/ReportContainer';
import './App.css';

class App extends React.Component  {

    onUnload() {
        localStorage.removeItem('orm');
    }

    componentDidMount() {
       window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    render() {
        return (<div>
            <Router>
                <div>
                    {(document.location.pathname === '/runreport')
                        && <PrivateRoute path="/" component={ReportContainer}/>}
                    {(document.location.pathname === '/')
                        && <PrivateRoute exact path="/" component={HomePage}/>}
                    <Route path="/login" component={LoginPage}/>
                    
                </div>
            </Router>
        </div>);
    }
}



export { App };
