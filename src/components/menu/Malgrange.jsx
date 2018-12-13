import React, { Component } from 'react';
import { Button, Field, Label, Control } from 'bloomer';
import Select from './withSelect';

class Malgrange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vertex: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        this.props.handler({
            malgrange: this.props.graph.malgrange({ vertex: this.state.vertex })
        });
    }

    handleChange(event) {
        this.setState({
            vertex: event.target.value,
        })
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Malgrange
                    </Label>
                    <Control className="delVertex-selects-wrapper">
                        <Select value={this.state.vertex} onChange={this.handleChange} options={this.props.graph} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Generate</Button>
            </div>
        );
    }
}

export default Malgrange;
