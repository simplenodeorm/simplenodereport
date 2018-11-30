import React from 'react';
import "../app/App.css";
import {BaseDesignComponent} from './BaseDesignComponent';
import {clearModalContainer} from './helpers';

class ModalDialog extends BaseDesignComponent {
    constructor(props) {
        super(props);
                
        this.state = {
            error: false
        };

        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    componentDidMount () {
        const me = this;
        this.clickFunction = function(e) { 
            if (me.isModalClick(e.target)) { 
                me.onClick(e);
            } else {
                e.stopImmediatePropagation(); 
            }
        };
            
        document.addEventListener('click', this.clickFunction, true);
    }
    
    
    onOk() {
        if (this.isComplete()) {
            clearModalContainer(this);
            if (this.props.onOk) {
                this.props.onOk(this.getResult());
            }
        } else {
            this.setState({error: true});
        }
    }
    
    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        clearModalContainer(this);
    }
    
    render() {
        const {error} = this.state;
        return <div><h2>{this.getTitle()}</h2>
            {error && <div className="errorDisplay">{this.getError()}</div>}
            {this.getContent()}
            <div className="buttonPanel">
                <button className="button" onClick={this.onOk}>Ok</button><button className="button" onClick={this.onCancel}>Cancel</button>
            </div>
            {this.resetError()}
        </div>;
    }
    
    isComplete() { return true; };
    resetError() { this.state.error = false; }
    getTitle() { return 'Modal Dialog'; };
    getResult() {};
    getError() { return 'Please complete all required entries';}
    getContent() {
        return<h2>modal dialog</h2>;
    }
}

export {ModalDialog};