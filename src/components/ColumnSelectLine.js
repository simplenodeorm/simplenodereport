import React from 'react';
import "../app/App.css";
import {MoveButton} from './MoveButton';
import {Checkbox} from './Checkbox';
import {isNumeric} from './helpers';

class ColumnSelectLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moved: false,
            showInReport: true,
            displayHeader: true,
            displayTotals: false
        };

        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
        this.setDisplayResult = this.setDisplayResult.bind(this);
        this.setDisplayHeader = this.setDisplayHeader.bind(this);
        this.setDisplayTotal = this.setDisplayTotal.bind(this);
    }

    render() {
        this.state.moved = false;
        return <div className="columnSelectLine">
            <div className="lineStyle1">
                { (this.props.index > 0) ? <MoveButton type='up' index={this.props.index} onMove={this.onMoveUp} /> : <img src="/images/blank.png"/> }
                <span className="label">{this.props.index + 1}.&nbsp;</span>{document.designData.availableColumns[this.props.index].path.replace(/\./g, '->')}</div>
            <div className="lineStyle1">
                { (this.props.index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.index} onMove={this.onMoveDown} /> : <img src="/images/blank.png"/> }
                <span>
                    <Checkbox label="Display Result" handleCheckboxChange={this.setDisplayResult}/>
                    &nbsp;<Checkbox label="Display Header" handleCheckboxChange={this.setDisplayHeader}/>
                    &nbsp;{ isNumeric(document.designData.availableColumns[this.props.index].type) && <Checkbox label="Display Total" handleCheckboxChange={this.setDisplayTotal}/> }
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

    }
    setDisplayHeader(display) {

    }
    setDisplayTotal(display) {

    }
}

export {ColumnSelectLine};