import React from 'react';
import { Select } from 'bloomer';
const withSelect = (props) => {
    return (
        <Select onChange={props.onChange} value={props.value}>
            <option hidden>Select</option>
            {
                props.options.map((o, i) => <option key={i}>{o.toString()}</option>)
            }
        </Select>)
}

export default withSelect;