import React, { Component } from 'react';
import { Button, Control, Input, Field, Label, Tag } from 'bloomer';
import Select from './withSelect';

class EdgeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edge: Array(0),
            startVertex: '',
            endVertex: '',
            cost: '',
            id: 1,
            directed: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEndVertexSelectChange = this.handleEndVertexSelectChange.bind(this);
        this.handleStartVertexSelectChange = this.handleStartVertexSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleEndVertexSelectChange(event) {
        this.setState({
            endVertex: event.target.value
        });
    }

    handleSubmit() {
        this.props.graph.addEdge({
            start: this.state.startVertex,
            end: this.state.endVertex,
            cost: this.state.cost,
            id: 'E' + this.state.id
        });

        if (this.state.directed) {
            this.props.graph.addEdge({
                start: this.state.endVertex,
                end: this.state.startVertex,
                cost: this.state.cost,
                id: 'E' + this.state.id
            })
        }

        this.setState({
            id: this.state.id + 1,
            cost: ''
        });
        this.props.handler({
            graph: this.props.graph
        });

    }

    handleStartVertexSelectChange(event) {
        this.setState({
            startVertex: event.target.value
        })
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
                        <label className="switch">
                            <input name="directed" type="checkbox" checked={this.state.directed} onChange={this.handleInputChange} />
                            <div className="slider round"></div>
                        </label>
                        {!this.state.directed ?
                            <Tag isColor="success">Directed</Tag> : <Tag isColor="danger">Undirected</Tag>}
                    </Label>
                    <Control className="edge-selects-wrapper">
                        <Select onChange={this.handleStartVertexSelectChange} value={this.state.startVertex} options={this.props.graph} />
                        <Select onChange={this.handleEndVertexSelectChange} value={this.state.endVertex} options={this.props.graph} />
                    </Control>
                </Field>
                <Field>
                    <Input onChange={this.handleChange} value={this.state.cost} style={{ maxWidth: 80 }} type="number" min="1" placeholder="Cost" />
                </Field>
                <Button isColor='info' onClick={this.handleSubmit} disabled={this.props.disableEdge}>Create</Button>
            </div>
        );
    }
}

export default EdgeInput;
