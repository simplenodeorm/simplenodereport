import React from 'react';

class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    
    render() {
        return <input type='text' maxlength={this.props.maxLength} 
            onKeyDown={this.onKeyDown} onBlur={this.props.onBlur} 
            defaultValue={this.props.defaultValue}/>;
    }

    onKeyDown(e) {
        let charCode = (e.which) ? e.which : e.keyCode;
        
        if (!this.props.allowCharacter(charCode, this.props.index)) {
            if ((charCode > 31) && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
            }
        }
    }
}

export {NumericInput};