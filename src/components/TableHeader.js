import React from 'react';

class TableHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="tableHeader">{this.props.config.name}</div>
    }
}

export {TableHeader};

