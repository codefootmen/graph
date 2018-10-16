import React, { Component } from 'react';
import { Button, Control, Input, Field, Label, Tag } from 'bloomer';
import Select from './withSelect';

class CreateXML extends Component{
    constructor() {
        
    }



    handleChange(event) {
        this.setState({
            vertex: event.target.value,
            success: false,
            error: false
        });
    }

    handleSubmit() {
        this.props.handle;
        //if(alguma coisa que ainda não entendi == Undirect){
        {
               var text =  super.props.graph.name + "{"
                        super.props.graphs.forEach(super.props.Edge);
                        {
                        text    +=  super.props.graph.startVertex
                                +  "--"
                                + super.props.graph.endVertex
                                + "}";
                        }
                var    parser = new DOMParser();
                var    xmlDoc = parser.parseFromString(text,"text/xml");
        }
        /*else{
            {
                        var text =  super.props.graph.name + "{"
                        +  super.props.graph.startVertex
                        +  "->"
                        + super.props.graph.endVertex
                        + "}";    
            }

        }        */
    }

    render() {
        return (
            <div className="menu-row">
                <Field>
                    <Label>
                        XML
                    </Label>
                </Field>
                <Button isColor='info' onClick={this.handleSubmit}>Create</Button>
            </div>
        );
    }

}