
import React from 'react';

class Checkbox extends React.Component {
    state = {
        isChecked: false,
    }

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        const { isChecked } = this.state;
        handleCheckboxChange(!isChecked);
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

