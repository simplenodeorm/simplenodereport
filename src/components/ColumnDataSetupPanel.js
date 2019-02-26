import React from 'react';
import "../app/App.css";
import config from "../config/appconfig";
import {ModalDialog} from "./ModalDialog";
import {ReportSectionSelect} from "./ReportSectionSelect";
import {FontSelectPanel} from "./FontSelectPanel";
import {TextAlignSelect} from "./TextAlignSelect";
import defaults from "../config/defaults";
import {Checkbox} from "./Checkbox";

class ColumnDataSetupPanel extends ModalDialog {
    constructor(props) {
        super(props);
        this.getFontSettings = this.getFontSettings.bind(this);
        this.setFontSettings = this.setFontSettings.bind(this);
        this.onPageBreakController = this.onPageBreakController.bind(this);
    }
    
    getContent() {
        return <div className="dataEntry">
            <table>
                <ReportSectionSelect asTableRow={true} reportObject={this.props.reportObject} />
                <tr>
                    <th>{config.textmsg.columnnamelabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.columnName} readOnly={true}/></td>
                </tr>
                <tr>
                    <th>{config.textmsg.columnpathlabel}</th>
                    <td><input type="text" defaultValue={this.props.reportObject.columnPath} readOnly={true}/></td>
                </tr>
                <tr>
                    <td/><td>
                        <Checkbox label={config.textmsg.pagebreakcontroller}
                              handleCheckboxChange={this.onPageBreakController}
                              isChecked={this.props.reportObject.pageBreakController}/>
                    </td>
                </tr>
    
                <tr><td colSpan="2"><div className="centerAlign">
                <FontSelectPanel
                    label={config.textmsg.columnfont}
                    getFontSettings={this.getFontSettings}
                    setFontSettings={this.setFontSettings}/></div></td></tr>
                    <tr><td colSpan="2">
                    <div className="centerAlign">
                    <TextAlignSelect setTextAlign={this.setTextAlign}
                        textAlign={this.props.reportObject.textAlign}/>
                    </div></td></tr>
            </table>
            </div>;
    }
    
    onPageBreakController(pageBreaker) {
        this.props.reportObject.pageBreakController = pageBreaker;
    }
    
    getFontSettings() {
        if (!this.props.reportObject.fontSettings) {
            this.props.reportObject.fontSettings = {
                font: defaults.font,
                fontSize: defaults.fontSize,
                fontColor: config.defaultTextColor,
                backgroundColor: config.defaultBackgroundColor,
                fontWeight: config.defaultFontWeight
            };
    
            this.props.reportObject.textAlign = 'left';
        }
        
        return this.props.reportObject.fontSettings;
    }
    
    setFontSettings(name, value) {
        this.props.reportObject.fontSettings[name] = value;
    }
    
    getResult() {
        if (this.props.reportObject.pageBreakController) {
            this.props.updatePageBreak(this.props.reportObject);
        }
        return this.props.reportObject;
    };
    
    getTitle() {
        return config.textmsg.columndataobjecttitle;
    }
    
    isComplete() {
        return true;
    }
    
    getError() {
        this.state.error = false;
        return 'Please enter url and link display text';
    }
    
}

export {ColumnDataSetupPanel};