import React, { Component } from 'react';
import { Button, Control, Input, Field, Label, Tag } from 'bloomer';
import { Radio } from 'bloomer/lib/elements/Form/Radio';
import { Checkbox } from 'bloomer/lib/elements/Form/Checkbox';

class VertexInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vertex: "",
            success: false,
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(event) {
        this.setState({
            vertex: event.target.value,
            success: false,
            error: false
        });
    }

    handleSubmit() {
        this.props.graph.addVertex(this.state);
        this.props.handler(
            {
                graph: this.props.graph,
                disableEdge: false
            }
        );
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Vertex
                        {this.state.success ?
                            <Tag isColor="success">{this.state.vertex} created</Tag> : ""}
                        {this.state.error ?
                            <Tag isColor="danger">Error</Tag> : ""}
                    </Label>
                    <Control>
                        <Input type="text" value={this.state.vertex} onChange={this.handleChange} placeholder='Vertex name' />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Create</Button>
            </div>
        );
    }
}

export default VertexInput;
