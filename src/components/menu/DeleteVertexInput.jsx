import React, { Component } from 'react';
import { Button, Control, Field, Label, Tag } from 'bloomer';
import Select from './withSelect';

class DeleteVertexInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          vertex: this.vertex,
          success: false,
          error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({
        vertex: event.target.value,
      })
      console.log(event.target.value);
    }

    handleSubmit() {
        this.props.graph.delVertex(this.state);
        this.props.handler(
          {
            graph: this.props.graph
          }
      );
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>Delete Vertex
                        {this.state.success ?
                            <Tag isColor="success">{this.state.deleteVertex} created</Tag> : ""}
                        {this.state.error ?
                            <Tag isColor="danger">Error</Tag> : ""}
                    </Label>
                    <Control className="delVertex-selects-wrapper">
                      <Select value={this.state.deleteVertex} onChange={this.handleChange} options={this.props.graph} />
                    </Control>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Delete</Button>
            </div>
        );
    }
}

export default DeleteVertexInput;
