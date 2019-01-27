import React from 'react';

class TableHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.text}</div>
    }
}

export {TableHeader};

