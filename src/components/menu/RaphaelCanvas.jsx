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

    componentDidMount() {

    }

    render() {
        var data = [
            { x: 50, y: 50, r: 40, attr: { "stroke": "#0b8ac9", "stroke-width": 5 }, animate: Raphael.animation({ cx: 60 }, 500, "<>") },
            { x: 100, y: 100, r: 40, attr: { "stroke": "#f0c620", "stroke-width": 5 }, animate: Raphael.animation({ cx: 105 }, 500, "<>") },
            { x: 150, y: 50, r: 40, attr: { "stroke": "#1a1a1a", "stroke-width": 5 } },
            { x: 200, y: 100, r: 40, attr: { "stroke": "#10a54a", "stroke-width": 5 }, animate: Raphael.animation({ cx: 195 }, 500, "<>") },
            { x: 250, y: 50, r: 40, attr: { "stroke": "#e11032", "stroke-width": 5 }, animate: Raphael.animation({ cx: 240 }, 500, "<>") }
        ]

        let increment = (360 / (this.props.graph.getOrder() || 1))

        return (
            < Paper width={this.props.canvas.height} height={this.props.canvas.height} >
                <Set>
                    {JSON.stringify(this.props.graph)}

                    {Object.keys(this.props.graph).map((value, i) => {
                        return (
                            <Set key={i}>
                                {console.log("Aqui:", this.state.radius)}
                                <Circle x={this.state.origin.x + (math.cos(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)}
                                    y={this.state.origin.y + (math.sin(math.unit((increment * i), 'deg')) * this.state.circleFrameRadius)}
                                    r={this.props.canvas.vertexRadius}
                                    attr={{ "stroke": "#0b8ac9", "stroke-width": 2 }}>
                                </Circle>
                                <Text x={this.state.initialPosition.x}
                                    y={this.state.initialPosition.y + 25}
                                    text={value} />
                            </Set>
                        )
                    })}
                </Set>
            </Paper >
        );
    }
}

export default RaphaelCanvas;
