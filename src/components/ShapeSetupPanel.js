import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {BorderSelectPanel} from "./BorderSelectPanel";
import {ModalDialog} from "./ModalDialog";
import {ReportSectionSelect} from "./ReportSectionSelect";
import {ShapeSelect} from "./ShapeSelect";


class ShapeSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getBorderSettings = this.getBorderSettings.bind(this);
        this.setBorderSettings = this.setBorderSettings.bind(this);
        this.setShape = this.setShape.bind(this);
    }
    
    getContent() {
        return <div className="dataEntry"><table>
            <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
            <ShapeSelect asTableRow={true} currentShape={this.props.reportObject.shape} setShape={this.setShape}/>
            <tr><td colSpan="2">
                <BorderSelectPanel hideCheckboxes={true}
                label={config.textmsg.shapeborder}
                getBorderSettings={this.getBorderSettings}
                setBorderSettings={this.setBorderSettings}/></td></tr>
        </table></div>
    }
    
    setShape(info) {
        this.props.reportObject.shape = info.target.options[info.target.selectedIndex].value;
    }
    
    
    getResult() {
        return this.props.reportObject;
    };
    
    getTitle() {
        return config.textmsg.shapeobjecttitle;
    }
    
    isComplete() {
        return (this.props.reportObject.shape
            && (this.props.reportObject.borderSettings.borderStyle !== 'none'));
    }
    
    getError() {
        this.state.error = false;
        return 'Please select shape and border type';
    }
    
    setBorderSettings(name, value) {
        this.props.reportObject.borderSettings[name] = value;
    }
    
    getBorderSettings() {
        if (!this.props.reportObject.borderSettings) {
            this.props.reportObject.borderSettings = {
                borderStyle: 'none',
                borderWidth: 1,
                borderColor: 'darkGray',
                left: true,
                top: true,
                right: true,
                bottom: true
            };
        }
        
        return this.props.reportObject.borderSettings;
    }
}

export {ShapeSetupPanel};