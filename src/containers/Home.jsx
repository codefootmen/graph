import React, { Component } from 'react';
import { Column, Columns, Container, Title, Box, Tag, Button } from 'bloomer';
import VertexInput from '../components/menu/VertexInput';
import EdgeInput from '../components/menu/EdgeInput';
import RaphaelCanvas from '../components/menu/RaphaelCanvas';
import Graph from '../utils/Graph';
import DeleteVertexInput from '../components/menu/DeleteVertexInput';
import DeleteEdgeInput from '../components/menu/DeleteEdgeInput';
import Upload from 'rc-upload';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Graph(),
            success: false,
            order: null,
            disableEdge: true,
            vertexOnHover: ""
        }
        this.handler = this.handler.bind(this);
        this.read = this.read.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {

        console.log(this.state.graph);
    }

    handler(state) {
        this.setState(state);
    }

    read() {
        fetch('http://localhost:5000/read')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                Object.setPrototypeOf(json, new Graph());
                this.setState({ graph: json });
            });
    }

    save() {
        fetch('http://localhost:5000/read', {
            method: "POST",
            mode: "cors",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.state.graph), // body data type must match "Content-Type" header
        })
            .then(response => console.log(response));
    }

    render() {
        return (
            <Container isFluid>
                <Columns>
                    <Column isSize={4} >
                        <Title>Menu</Title>
                        <Box>
                            <VertexInput handler={this.handler} graph={this.state.graph} />
                            <EdgeInput handler={this.handler} graph={this.state.graph} disableEdge={this.state.disableEdge} />
                            <DeleteVertexInput handler={this.handler} graph={this.state.graph} />
                            <DeleteEdgeInput handler={this.handler} graph={this.state.graph} />
                            <Upload
                                action="http://localhost:5000/upload"
                                onSuccess={this.read}
                            >
                                <div className="menu-row" >
                                    <Button isColor='info'>Upload XML</Button>
                                </div>
                            </Upload>
                            <div className="menu-row" >
                                <Button
                                    isColor='info'
                                    onClick={this.read}>
                                    Load Graph From Server
                                </Button>
                            </div>
                            <div className="menu-row" >
                                <Button
                                    isColor='info'
                                    onClick={this.save}>
                                    Save Graph
                                </Button>
                            </div>

                        </Box>
                    </Column>
                    <Column>
                        <Title>Graph</Title>
                        <Box>
                            {this.state.graph.isDirected() ?
                                <Tag isColor="danger">Undirected</Tag> : <Tag isColor="primary">Directed</Tag>}

                            {this.state.graph.isComplete() ?
                                <Tag isColor="info">Complete</Tag> : ''}

                            {this.state.graph.isRegular() ?
                                <Tag isColor="success">Regular</Tag> : ''}

                            <RaphaelCanvas handler={this.handler} graph={this.state.graph} canvas={{ height: 600, width: 600, vertexRadius: 15 }} />
                        </Box>
                        <Columns>
                            <Column>
                                <Box>
                                    <Columns>
                                        <Column>
                                            Order: {this.state.order}
                                        </Column>
                                        <Column>
                                            In Degree: {this.state.graph.getInDegree({ vertex: this.state.vertexOnHover })}
                                        </Column>
                                        <Column>
                                            Out Degree: {this.state.graph.getOutDegree({ vertex: this.state.vertexOnHover })}
                                        </Column>
                                    </Columns>
                                </Box>
                            </Column>
                        </Columns>
                    </Column>
                </Columns>
            </Container>
        );
    }
}

export default Home;
