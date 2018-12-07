import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import {BaseDesignComponent} from './BaseDesignComponent';
import {PreferencesPanel} from './PreferencesPanel';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.newDocument = this.newDocument.bind(this);
        this.preferences = this.preferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
    }
    
    
    render() {
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newDocument
                },
                {
                    text: config.textmsg.preferencesmenuname,
                    callback: this.preferences
                }
                ]
            }
        ];
        const orm = JSON.parse(localStorage.getItem('orm'));
        return <Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>
    }

    newDocument() {
        this.props.setCurrentDocument();
    }

    preferences() {
        let rc = {left: 200, top: 50, width: 300, height: 400};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel onOk={this.savePreferences}/>, mc);
    }
    
    savePreferences() {
        alert('--------->savePreferences');
    }
}

export {AppToolbar};
