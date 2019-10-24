/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';

class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    
    render() {
        let myStyle = {
            width: '60px'
        };
        return <input style={myStyle} type='text' maxLength={this.props.maxLength}
            onKeyDown={this.onKeyDown} onBlur={this.props.onBlur} 
            defaultValue={this.props.defaultValue}/>;
    }

    onKeyDown(e) {
        let charCode = (e.which) ? e.which : e.keyCode;
        
        if (!this.props.allowCharacter
            || !this.props.allowCharacter(charCode, this.props.index)) {
            if ((charCode > 31) && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
            }
        }
    }
}

export {NumericInput};