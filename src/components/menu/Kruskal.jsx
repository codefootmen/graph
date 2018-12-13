import React, { Component } from 'react';
import { Button, Field, Label } from 'bloomer';

class Kruskal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.handler({
            kruskal: this.props.graph.kruskal()
        });
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Kruskal
                    </Label>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Generate</Button>
            </div>
        );
    }
}

export default Kruskal;
