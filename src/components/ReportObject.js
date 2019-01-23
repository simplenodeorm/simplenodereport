import React from 'react';
import "../app/App.css";
import config from '../config/appconfig';
import {getFontHeight} from './helpers';

class ReportObject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.config.objectType) {
            case 'dbdata':
                return this.getDBDataContent();
            break;
        }
    }

    getDBDataContent() {
        let headerHeight = getFontHeight(this.props.config.headerFontSettings.fontName, this.props.config.headerFontSettings.fontSize);
        let dataRowHeight = getFontHeight(this.props.config.dataFontSettings.fontName, this.props.config.dataFontSettings.fontSize);
        let numRows = ((this.props.config.rect.height - headerHeight)/ dataRowHeight);


        return <div className={this.getCssClass()}></div>;
    }

    getCssClass() {
        let style = document.getElementsByTagName('style')[0];
        let retval = (document.designData.reportName + '_' + this.props.config.objectType + this.props.config.id);
        if (!style.innerHTML.includes('.' + retval)) {
            let css;
            switch(this.props.config.objectType) {
                case 'dbdata':
                    css = ' .' + retval
                        + ' {position: relative; display: grid; left: '
                        + this.props.config.rect.left
                        + 'px; top: '
                        + this.props.config.rect.left
                        + 'px; width: '
                        + this.props.config.rect.width
                        + 'px; height: '
                        + this.props.config.rect.width
                        + 'px; grid-template-columns: ';
                    for (let i = 0; i < this.props.config.reportColumns.length; ++i) {
                        if (this.props.config.reportColumns[i].displayHeader ||
                            this.props.config.reportColumns[i].displayResult) {
                            css += ((this.props.config.reportColumns[i].width/config.zoomFactor) + 'px');
                        }
                    }
                    css += '}';
                    break;
            }

            style.innerHTML = style.innerHTML + css;
        }

        return retval;
    }

}

    
export {ReportObject};