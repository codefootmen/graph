import React, { Component } from 'react';
import { Raphael, Paper, Set, Circle, Ellipse, Image, Rect, Text, Path, Line } from 'react-raphael';
import math from 'mathjs';

class RaphaelCanvas extends Component {
    constructor(props) {
        super(props);
        let radius = 0;
        if (this.props.canvas.width > this.props.canvas.height) {
            radius = (this.props.canvas.height / 2) - this.props.canvas.vertexRadius;
        } else {
            radius = (this.props.canvas.width / 2) - (this.props.canvas.vertexRadius + 2);
        }
        console.log(radius);
        let start = { x: (this.props.canvas.width / 2) + radius, y: this.props.canvas.height / 2 }

        this.state = {
            origin: {
                x: this.props.canvas.width / 2, y: this.props.canvas.height / 2
            },
            circleFrameRadius: radius,
            initialPosition: start
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleChange(event) {
        this.setState({
            vertex: event.target.value,
            success: false,
            error: false
        });
    }

    handleSubmit() {

    }

    handleMouseOver(vertex) {
        this.props.handler({
            vertexOnHover: vertex.data().vertex
        })
    }

    componentDidMount() {

    }

    render() {
        let increment = (360 / (this.props.graph.getOrder() || 1))
        let self = this;
        let vertices = [];
        let lines = [];
        return (
            <Paper width={this.props.canvas.height} height={this.props.canvas.height} >
                <Set>
                    {JSON.stringify(this.props.graph)}

                    {Object.keys(this.props.graph).map((value, i) => {

                        vertices[i] = <Circle
                            data={{ vertex: value }}
                            mouseover={function () { return self.handleMouseOver(this) }}
                            x={this.state.origin.x + (math.cos(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)}
                            y={this.state.origin.y + (math.sin(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)}
                            r={this.props.canvas.vertexRadius}
                            attr={{ "fill": "#0b8ac9", "stroke-width": 2, "cursor": "pointer" }} />

                        return (
                            <Set key={i}>
                                {vertices[i]}
                                <Text x={this.state.origin.x + (math.cos(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)}
                                    y={(this.state.origin.y + (math.sin(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)) + 25}
                                    text={value} />
                            </Set>
                        )
                    })}

                    {Object.keys(this.props.graph).map((start, i) => {
                        this.props.graph[start].forEach((end) => {
                            lines.push(<Line
                                key={end.id}
                                x1={vertices[vertices.indexOf(vertices.filter(x => x.props.data.vertex == start)[0])].props.x}
                                y1={vertices[vertices.indexOf(vertices.filter(x => x.props.data.vertex == start)[0])].props.y}
                                x2={vertices[vertices.indexOf(vertices.filter(x => x.props.data.vertex == end.name)[0])].props.x}
                                y2={vertices[vertices.indexOf(vertices.filter(x => x.props.data.vertex == end.name)[0])].props.y}
                                attr={{ 'arrow-end': 'open-wide-long', "stroke-width": 1.5 }}
                            />);
                        });
                    })}
                    {lines}
                </Set>
            </Paper>
        );
    }
}

export default RaphaelCanvas;
