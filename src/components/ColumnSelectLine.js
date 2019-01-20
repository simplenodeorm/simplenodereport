import React from 'react';
import "../app/App.css";
import {MoveButton} from './MoveButton';
import {Checkbox} from './Checkbox';
import {isNumeric} from './helpers';
import {TextAlignSelect} from './TextAlignSelect';

class ColumnSelectLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moved: false,
            displayResult: document.designData.availableColumns[this.props.index].displayResult,
            displayHeader: document.designData.availableColumns[this.props.index].displayHeader,
            displayTotal: document.designData.availableColumns[this.props.index].displayTotal,
            textAlign: document.designData.availableColumns[this.props.index].textAlign
        };

        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
        this.setDisplayResult = this.setDisplayResult.bind(this);
        this.setDisplayHeader = this.setDisplayHeader.bind(this);
        this.setDisplayTotal = this.setDisplayTotal.bind(this);
        this.setTextAlign = this.setTextAlign.bind(this);
    }

    render() {
        const {moved, displayResult, displayHeader, displayTotal, textAlign} = this.state;
        return <div className="columnSelectLine">
            <div className="lineStyle1">
                { (this.props.index > 0) ? <MoveButton type='up' index={this.props.index} onMove={this.onMoveUp} /> : <img src="/images/blank.png"/> }
                <span className="label">{this.props.index + 1}.&nbsp;</span>{document.designData.availableColumns[this.props.index].path.replace(/\./g, '->')}</div>
            <div className="lineStyle1">
                { (this.props.index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.index} onMove={this.onMoveDown} /> : <img src="/images/blank.png"/> }
                <span>
                    <TextAlignSelect setTextAlign={this.setTextAlign} textAlign={textAlign}/>
                    <Checkbox label="Display Result" handleCheckboxChange={this.setDisplayResult} isChecked={displayResult}/>
                    &nbsp;<Checkbox label="Display Header" handleCheckboxChange={this.setDisplayHeader} isChecked={displayHeader}/>
                    &nbsp;{ isNumeric(document.designData.availableColumns[this.props.index].type) && <Checkbox label="Display Total" handleCheckboxChange={this.setDisplayTotal} isChecked={displayTotal}/> }
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
        document.designData.availableColumns[this.props.index].displayResult = display;
    }

    setDisplayHeader(display) {
        document.designData.availableColumns[this.props.index].displayHeader = display;
    }

    setDisplayTotal(display) {
        document.designData.availableColumns[this.props.index].displayTotal = display;
    }

    setTextAlign(textAlign) {
        document.designData.availableColumns[this.props.index].textAlign = textAlign;
    }
}

export {ColumnSelectLine};