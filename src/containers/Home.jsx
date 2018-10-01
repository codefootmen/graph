import React, { Component } from 'react';
import { Column, Columns, Container, Title, Box } from 'bloomer';
import VertexInput from '../components/menu/VertexInput';
import EdgeInput from '../components/menu/EdgeInput';
import RaphaelCanvas from '../components/menu/RaphaelCanvas';
import Graph from '../utils/Graph';
import DeleteVertexInput from '../components/menu/DeleteVertexInput';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Graph(),
            success: false,
            order: null,
            inDegree: null,
            outDegree: null,
            disableEdge: true
        }
        this.handler = this.handler.bind(this);
    }
    componentDidMount() {
        console.log(this.state.graph);
    }

    handler(state) {
        this.setState(state);
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
                            <DeleteVertexInput handler = {this.handler} graph= {this.state.graph}/>
                        </Box>
                    </Column>
                    <Column>
                        <Title>Graph</Title>
                        <Box><RaphaelCanvas graph={this.state.graph} canvas={{ height: 300, width: 300, vertexRadius: 15 }} /></Box>
                        <Columns>
                            <Column>
                                <Box>
                                    <Columns>
                                        <Column>
                                            Order: {this.state.order}
                                        </Column>
                                        <Column>
                                            In Degree: {this.state.inDegree}
                                        </Column>
                                        <Column>
                                            Out Degree: {this.state.outDegree}
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
