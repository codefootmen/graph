import React, { Component } from 'react';
import { Button, Control, Field, Label } from 'bloomer';
import Select from './withSelect';

class DepthSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: '',
            end: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            vertex: event.target.value
        });
    }

    handleSubmit() {
        this.props.handler({
            DepthSearch: this.props.graph.depthSearch(this.state.start, this.state.end)
        });
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Depth Search
                    </Label>
                    <Control className="edge-selects-wrapper">
                        <Select onChange={this.handleChange} options={this.props.graph} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Find</Button>
            </div>
        );
    }
}

export default DepthSearch;
