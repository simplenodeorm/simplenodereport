import React from 'react';
import "../app/App.css";
import {MoveButton} from './MoveButton';

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
    }

    render() {
        this.state.moved = false;
        return <div className="columnSelectLine">
            <div className="lineStyle1">
                { (this.props.index > 0) ? <MoveButton type='up' index={this.props.index} onMove={this.onMoveUp} /> : <img src="/images/blank.png"/> }
                <span className="label">{this.props.index + 1}.&nbsp;</span>{document.designData.availableColumns[this.props.index].__path__.replace(/\./g, '->')}</div>
            <div className="lineStyle1">
                { (this.props.index < (this.props.nodeCount() - 1)) ? <MoveButton type='down' index={this.props.index} onMove={this.onMoveDown} /> : <img src="/images/blank.png"/> }
            </div>
        </div>;
    }

    onMoveDown() {
        this.props.onMove(this.props.index, 1);
    }

    onMoveUp() {
        this.props.onMove(this.props.index, -1);
    }
}

export {ColumnSelectLine};