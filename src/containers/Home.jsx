import React, { Component } from 'react';
import { Column, Columns, Container, Title, Box, Tag, Button } from 'bloomer';
import VertexInput from '../components/menu/VertexInput';
import EdgeInput from '../components/menu/EdgeInput';
import RaphaelCanvas from '../components/menu/RaphaelCanvas';
import Graph from '../utils/Graph';
import DeleteVertexInput from '../components/menu/DeleteVertexInput';
import DeleteEdgeInput from '../components/menu/DeleteEdgeInput';
import Upload from 'rc-upload';
import Download from 'js-file-download';
import Dijkstra from '../components/menu/DijkstraInput';
import DepthFirst from '../components/menu/DepthFirst';
import BreadthFirst from '../components/menu/BreadthFirst';
import Modal from '../components/modal';
import Kruskal from '../components/menu/Kruskal';
import Prim from '../components/menu/Prim'
import Malgrange from '../components/menu/Malgrange';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Graph(),
            dijkstraPath: [],
            depthFirst: [],
            breadthFirst: [],
            kruskal: [],
            prim: [],
            malgrange: [],
            success: false,
            disableEdge: true,
            vertexOnHover: "",
            modalIsActive: false,
            modalMesage: "No message"
        }
        this.handler = this.handler.bind(this);
        this.read = this.read.bind(this);
        this.save = this.save.bind(this);
        this.download = this.download.bind(this);
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
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.state.graph),
        })
            .then(response => {
                this.setState({
                    modalIsActive: true,
                    modalMessage: "Sucesso!"
                });
            }).catch(e => {
                this.setState({
                    modalIsActive: true,
                    modalMessage: e.toString()
                })
            });
    }

    download() {
        fetch('http://localhost:5000/download')
            .then(response => response.text())
            .then(data => Download(data, 'graph.xml'))
            .catch(e => {
                this.setState({
                    modalIsActive: true,
                    modalMessage: e.toString()
                });
            });
    }

    render() {
        return (
            <Container isFluid>
                <Modal
                    active={this.state.modalIsActive}
                    message={this.state.modalMessage}
                    close={() => { this.setState({ modalIsActive: false }) }} />
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
                            <div className="menu-row" >
                                <Button
                                    isColor='info'
                                    onClick={this.download}>
                                    Download XML
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
                                            Order: {this.state.graph.getOrder()}
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
                    <Column>
                        <Title>Algorithms</Title>
                        <Box>
                            <Dijkstra handler={this.handler} graph={this.state.graph} />
                            <DepthFirst handler={this.handler} graph={this.state.graph} />
                            <BreadthFirst handler={this.handler} graph={this.state.graph} />
                            <Kruskal handler={this.handler} graph={this.state.graph} />
                            <Prim handler={this.handler} graph={this.state.graph} />
                            <Malgrange handler={this.handler} graph={this.state.graph} />
                        </Box>
                        <Box>
                            <div className="menu-row">
                                Dijkstra Path: {this.state.dijkstraPath
                                    .map(x => x.join(':')).join(' ')}
                            </div>
                            <div className="menu-row">
                                Depth First: {this.state.depthFirst ? this.state.depthFirst.join('-') : "No"}
                            </div>
                            <div className="menu-row">
                                Breadth First: {this.state.breadthFirst ? this.state.breadthFirst.join('-') : "No"}
                            </div>
                            <div className="menu-row">
                                Kruskal: {this.state.kruskal ? this.state.kruskal.join('-') : "No"}
                            </div>
                            <div className="menu-row">
                                Prim: {this.state.prim ? this.state.prim.join('-') : "No"}
                            </div>
                            <div className="menu-row">
                                Malgrange: {this.state.malgrange ? this.state.malgrange.join('-') : "No"}
                            </div>
                        </Box>
                    </Column>
                </Columns>
            </Container>
        );
    }
}

export default Home;
