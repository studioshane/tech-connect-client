import React from "react"
import {
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl
} from "@material-ui/core"

const buttonOptions = ["producer", "technician"]

const RadioButtons = props => {
    return (
        <FormControl component='fieldset'>
            <RadioGroup
                value={props.value}
                onChange={event => props.handleSelect(event)}
            >
                {buttonOptions.map(name => (
                    <FormControlLabel
                        key={name}
                        value={name}
                        control={<Radio color='primary' />}
                        label={name}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtons
