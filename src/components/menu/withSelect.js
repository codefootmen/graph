import React from 'react';
import { Select } from 'bloomer';
const withSelect = (props) => {
    return (
        <Select onChange={props.onChange} value={props.value}>
            <option hidden>Select</option>
            {
                Object.keys(props.options).map((o, i) => <option key={i}>{o}</option>)
            }
        </Select>)
}

export default withSelect;