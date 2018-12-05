import React, { Component } from 'react';
import { Button, Field, Label } from 'bloomer';

class Prim extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.handler({
            prim: this.props.graph.prim()
        });
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Prim
                    </Label>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Generate</Button>
            </div>
        );
    }
}

export default Prim;
