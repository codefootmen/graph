import React, { Component } from 'react';
import { Button, Control, Input, Field, Label, Tag } from 'bloomer';
import Select from './withSelect';

class DeleteEdgeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edge: this.edge,
            startVertex: this.startVertex,
            endVertex: this.endVertex,
            success: false,
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartVertexSelectChange = this.handleStartVertexSelectChange.bind(this);
        this.handleEndVertexSelectChange = this.handleEndVertexSelectChange.bind(this);
    }

    handleSubmit() {
        this.props.graph.delEdge({ start: this.state.startVertex, end: this.state.endVertex });
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

    handleEndVertexSelectChange(event) {
        this.setState({
            endVertex: event.target.value
        });
        console.log(event.target.value);
    }


    render() {

        let edges = [];
        if (this.state.graph) {
            Object.keys(this.state.graph).forEach(x => {
                edges = edges.concat(this.state.graph[x].map(t => [x, t]));
            });
        }
        console.log("EDGES",edges);

        return (
            <div className="menu-row" >
                <Field>
                    <Label>Delete Edge </Label>
                    <Control>
                        <Select onChange={this.handleEdgeChange} value={this.state.startVertex} options={this.props.graph} />
                        <Select onChange={this.handleEdgeChange} value={this.state.endVertex} options={this.props.graph} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit} disabled={this.props.disableEdge}>Delete</Button>
            </div>
        );
    }
}

export default DeleteEdgeInput;
