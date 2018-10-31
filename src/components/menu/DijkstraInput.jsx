import React, { Component } from 'react';
import { Button, Control, Field, Label } from 'bloomer';
import Select from './withSelect';

class DijkstraInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vertex: this.vertex
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    handleStart(event) {
        this.setState({
            start: event.target.value,
        });
    }

    handleEnd(event) {
        this.setState({
            end: event.target.value,
        });
    }

    handleSubmit() {
        this.props.handler({
            dijkstraPath: this.props.graph.dijkstra(this.state.start, this.state.end)
        });
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Dijkstra
                    </Label>
                    <Control className="edge-selects-wrapper">
                        <Select onChange={this.handleStart} options={this.props.graph} />
                        <Select onChange={this.handleEnd} options={this.props.graph} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Find</Button>
            </div>
        );
    }
}

export default DijkstraInput;
