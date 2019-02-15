import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {ModalDialog} from "./ModalDialog";
import {Checkbox} from './Checkbox';
import {ReportSectionSelect} from "./ReportSectionSelect";

class ImageSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.setUrl = this.setUrl.bind(this);
        this.setAltText= this.setAltText.bind(this);
        this.setSizeToContent = this.setSizeToContent.bind(this);
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
                <tr>
                    <th>{config.textmsg.urllabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.url} onBlur={this.setUrl}/></td>
                </tr>
                <tr>
                    <th>{config.textmsg.alttextlabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.altText} onBlur={this.setAltText}/></td>
                </tr>
                <tr>
                    <th/><td><Checkbox label={config.textmsg.sizetocontent}
                        isChecked={this.props.reportObject.sizeToContent}
                        handleCheckboxChange={this.setSizeToContent}/></td>
                </tr>
            </table></div>;
    }
    
    setUrl(info) {
        this.props.reportObject.url = info.target.value;
    }
    
    setAltText(info) {
        this.props.reportObject.altText = info.target.value;
    }
    
    setSizeToContent(sizeToContent) {
        this.props.reportObject.sizeToContent = sizeToContent;
    }
    
    getResult() {
        return this.props.reportObject;
    };
    
    getTitle() {
        return config.textmsg.imageobjecttitle;
    }
    
    isComplete() {
        if (this.props.reportObject.url && this.props.reportObject.altText) {
            return true;
        } else {
            return false;
        }
    }
    
    getError() {
        this.state.error = false;
        return 'Please enter url and alt text';
    }
    
}

export {ImageSetupPanel};