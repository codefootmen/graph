import React, { Component } from 'react';
import { Button, Control, Field, Label } from 'bloomer';
import Select from './withSelectArray';

class DeleteEdgeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edge: this.edge,
            startVertex: '',
            endVertex: '',
            success: false,
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdgeChange = this.handleEdgeChange.bind(this);
    }

    handleSubmit() {
        this.props.graph.delEdge({ start: this.state.startVertex, end: this.state.endVertex });
        this.props.handler({
            graph: this.props.graph
        });
    }

    handleEdgeChange(event) {
        let first = event.target.value.split(',')[0];
        let second = event.target.value.split(',')[1];
        console.log(first, second);
        this.setState({
            startVertex: first,
            endVertex: second
        });
    }

    render() {

        let edges = [];
        if (this.props.graph) {
            Object.keys(this.props.graph).forEach(x => {
                edges = edges.concat(this.props.graph[x].map(t => [x, t.name]));
            });
        }

        return (
            <div className="menu-row" >
                <Field>
                    <Label>Delete Edge </Label>
                    <Control>
                        <Select onChange={this.handleEdgeChange} options={edges} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit} disabled={this.props.disableEdge}>Delete</Button>
            </div>
        );
    }
}

export default DeleteEdgeInput;
