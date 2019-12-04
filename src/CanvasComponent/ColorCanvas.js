import React, { Component } from "react";
import { Card } from "antd";
import "./ColorCanvas.less";

class ColorCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasFSRef = React.createRef();
        this.canvasFSARCRef = React.createRef();
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.drawFillStyle("canvasFSRef");
        this.drawFillStyleArc("canvasFSARCRef");
    }

    getCtx(ref) {

        if (this[ref].current) {
            debugger;

            return this[ref].current.getContext("2d");
        }

    }

    drawFillStyle(canvas) {
        let ctx = this.getCtx(canvas);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
                    255 - 42.5 * j
                )},0)`;

                ctx.fillRect(j * 25, i * 25, 25, 25);
            }
        }
    }

    drawFillStyleArc(canvas) {
        let ctx = this.getCtx(canvas);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                ctx.strokeStyle =
                    "rgb(0," +
                    Math.floor(255 - 42.5 * i) +
                    "," +
                    Math.floor(255 - 42.5 * j) +
                    ")";
                ctx.beginPath();
                ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    componentDidMount() {
        this.draw();
    }

    render() {
        return (
            <div className="root_container">
                <Card title="color fillStyle测试 rect" className="wrap_card">
                    <canvas
                        ref={this.canvasFSRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="color fillStyle测试 arc" className="wrap_card">
                    <p>
                        js ref=「ele => (this.canvasPath2dRef = ele)」
                        这种方案绑定的ref，不用在jsx中使用`this.canvasPath2dRef.current`获取dom，可以直接通过`this.canvasPath2dRef`获取dom。
                    </p>
                    <canvas
                        ref={this.canvasFSARCRef}
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
