import React from 'react';
import "../app/App.css";

const upImage = <img alt='move line up' src='/images/uparrow.png' />;              
const downImage = <img alt='move line down' src='/images/downarrow.png' />;               

class MoveButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    render() {
        return <button className="moveButton" onClick={this.onClick} >{this.getImage()}</button>;              
    }
    
    onClick(e) {
        this.props.onMove();
    }

    getImage() {
        switch(this.props.type) {
            case 'up':
                return upImage;              
            case 'down':
                return downImage;     
            default:
              break;      
            
        }
   }
}

export {MoveButton};