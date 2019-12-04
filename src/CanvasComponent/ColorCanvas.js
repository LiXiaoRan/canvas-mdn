import React, { Component } from "react";
import { Card } from "antd";
import "./CanvasShape.less";

class ColorCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasFSRef = React.createRef();
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.drawFillStyle("canvasFSRef");
    }

    getCtx(ref) {
        if (this[ref].current) {
            return this[ref].current.getContext("2d");
        }else{
            throw new Error("no refs");
            
        }
    }

    drawFillStyle(canvas) {
        let ctx = this.getCtx(canvas);
        // let ctx = this.canvasFSRef.current.getContext("2d");
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
                    255 - 42.5 * j
                )},0)`;

                ctx.fillRect(j * 25, i * 25, 25, 25);
            }
        }
    }

    componentDidMount() {
        this.draw();
    }

    render() {
        return (
            <div>
                <Card title="color fillStyle测试" className="wrap_card">
                    <canvas
                        ref={this.canvasFSRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>
            </div>
        );
    }
}

export default ColorCanvas;
