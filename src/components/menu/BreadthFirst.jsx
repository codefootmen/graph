import React, { Component } from 'react';
import { Button, Control, Field, Label } from 'bloomer';
import Select from './withSelect';

class BreadthFirst extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: '',
            end: ''
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStart(event) {
        this.setState({
            start: event.target.value,
        });
    }

    handleEnd(event){
        this.setState({
            end:event.target.value,
        });
    }

    handleSubmit() {
        this.props.handler({
            breadthFirst: this.props.graph.breadthFirst({start: this.state.start, end: this.state.end})
        });
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Breadth First
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

export default BreadthFirst;
