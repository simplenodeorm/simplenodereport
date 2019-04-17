
import React from 'react';

class Checkbox extends React.Component {
    state = {
        isChecked: this.props.isChecked,
    };

    toggleCheckboxChange = () => {
        if (!this.props.canChange || this.props.canChange(!this.state.isChecked)) {
            const {handleCheckboxChange} = this.props;
    
            this.setState(({isChecked}) => (
                {
                    isChecked: !isChecked,
                }
            ));
    
            const {isChecked} = this.state;
            handleCheckboxChange(!isChecked);
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({isChecked: nextProps.isChecked});
    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />

                    {label}
                </label>
        );
    }
}

export {Checkbox};

