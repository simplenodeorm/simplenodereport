import React from 'react';
import "../app/App.css";
import {MoveButton} from './MoveButton';
import {Checkbox} from './Checkbox';
import {TextAlignSelect} from './TextAlignSelect';
import config from '../config/appconfig.json';
import {getReportColumn} from './helpers';

class ColumnSelectLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moved: false,
            displayResult: this.props.reportColumns[this.props.index].displayResult,
            displayTotal: this.props.reportColumns[this.props.index].displayTotal,
            textAlign: this.props.reportColumns[this.props.index].textAlign
        };

        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
        this.setDisplayResult = this.setDisplayResult.bind(this);
        this.setDisplayTotal = this.setDisplayTotal.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            displayResult: nextProps.reportColumns[this.props.index].displayResult,
            displayTotal: nextProps.reportColumns[this.props.index].displayTotal,
            textAlign: nextProps.reportColumns[this.props.index].textAlign});
    }

    render() {
        const {displayResult, displayTotal, textAlign} = this.state;
        let columnData = getReportColumn(this.props.reportColumns[this.props.index].key);

        return <div className="columnSelectLine">
            <div className="lineStyle1">
                { (this.props.index > 0) ? <MoveButton type='up' index={this.props.index} onMove={this.onMoveUp} /> : <img alt="" src="/images/blank.png"/> }
                <span className="label">{this.props.index + 1}.&nbsp;</span>{columnData.path.replace(/\./g, '->')}</div>
            <div className="lineStyle1">
                { (this.props.index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.index} onMove={this.onMoveDown} /> : <img alt="" src="/images/blank.png"/> }
                <span>
                    <TextAlignSelect setTextAlign={this.setTextAlign} textAlign={textAlign}/>
                    <Checkbox label={config.textmsg.displayresult} handleCheckboxChange={this.setDisplayResult} isChecked={displayResult}/>
                    &nbsp;{ columnData.isNumeric && <Checkbox label={config.textmsg.displaytotal} handleCheckboxChange={this.setDisplayTotal} isChecked={displayTotal}/> }
                </span>
            </div>
        </div>;
    }

    onMoveDown() {
        this.props.onMove(this.props.index, 1);
    }

    onMoveUp() {
        this.props.onMove(this.props.index, -1);
    }

    setDisplayResult(display) {
        this.props.reportColumns[this.props.index].displayResult = display;
    }

    setDisplayTotal(display) {
        this.props.reportColumns[this.props.index].displayTotal = display;
    }

    setTextAlign(textAlign) {
        this.props.reportColumns[this.props.index].textAlign = textAlign;
    }
}

export {ColumnSelectLine};