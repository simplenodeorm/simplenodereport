import React from 'react';

class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    render() {
        return <div onMouseMove={this.onMouseMove}>{this.props.text}</div>
    }

    onMouseMove(info) {
        let rc = info.target.getBoundingClientRect();
        if (((info.clientX - rc.left) < 3) || ((rc.width - (info.clientX - rc.left)) < 3)) {
            info.target.style.cursor = 'ew-resize';
        } else {
            info.target.style.cursor = '';
        }
    }
}

export {TableHeader};

