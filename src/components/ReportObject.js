import React from 'react';
import "../app/App.css";

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
        return <div>xxxxxxxxxxxxxxx</div>;
    }
}

    
export {ReportObject};