import React, { Component } from 'react';
import { Button, Control, Input, Field, Label, Tag } from 'bloomer';
import Select from './withSelect';

class EdgeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edge: Array(0),
            startVertex: "",
            endVertex: "",
            cost: 0,
            success: false,
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEndVertexSelectChange = this.handleEndVertexSelectChange.bind(this);
        this.handleStartVertexSelectChange = this.handleStartVertexSelectChange.bind(this);
    }

    handleEndVertexSelectChange(event) {
        this.setState({
            endVertex: event.target.value
        });
        console.log(event.target.value);
    }

    handleSubmit() {
        this.props.graph.addEdge({ start: this.state.startVertex, end: this.state.endVertex, cost: this.state.cost });
        this.props.handler({
            graph: this.props.graph
        });

    }

    handleStartVertexSelectChange(event) {
        this.setState({
            startVertex: event.target.value
        })
        console.log(event.target.value)
    }

    handleChange(event) {
        this.setState({
            cost: event.target.value
        })
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Edge
                        {this.state.success ?
                            <Tag isColor="success">{this.state.vertex} created</Tag> : ""}
                        {this.state.error ?
                            <Tag isColor="danger">Error</Tag> : ""}
                    </Label>
                    <Control className="edge-selects-wrapper">
                        <Select onChange={this.handleStartVertexSelectChange} value={this.state.startVertex} options={this.props.graph} />
                        <Select onChange={this.handleEndVertexSelectChange} value={this.state.endVertex} options={this.props.graph} />
                    </Control>
                </Field>
                <Field>
                    <Input onChange={this.handleChange} value={this.state.cost} style={{ maxWidth: 80 }} type="number" min={0} />
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Create</Button>
            </div>
        );
    }
}

export default EdgeInput;
