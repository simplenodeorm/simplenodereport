import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import './App.css';

class App extends React.Component  {
    constructor(props) {
        super(props);
    }
    
    onUnload(event) { 
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
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/" component={HomePage}/> 
                </div>
            </Router>
        </div>);
    }
}



export { App };
