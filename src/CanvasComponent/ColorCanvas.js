import React, { Component } from "react";
import { Card } from "antd";
import "./ColorCanvas.less";

let offset = 0;

class ColorCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasFSRef = React.createRef();
        this.canvasFSARCRef = React.createRef();
        this.canvasGloRef = React.createRef();
        this.canvasLwRef = React.createRef();
        this.canvasLcapRef = React.createRef();
        this.canvasLDRef = React.createRef();
        this.canvasLGRef = React.createRef();
        this.canvasPatternRef = React.createRef();
        this.canvasShadowRef=React.createRef();
        this.draw = this.draw.bind(this);
        this.dashTimer = null;
    }

    draw() {
        this.drawFillStyle("canvasFSRef");
        this.drawFillStyleArc("canvasFSARCRef");
        this.drawGlobalAlpha("canvasGloRef");
        this.drawLineWidth("canvasLwRef");
        this.drawLineCap("canvasLcapRef");
        // this.drawLineDash("canvasLDRef");
        this.march();
        this.drawLinearGradient("canvasLGRef");
        this.drawPattern("canvasPatternRef");
        this.drawShadow("canvasShadowRef")
    }

    getCtx(ref) {
        if (this[ref].current) {
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

    drawGlobalAlpha(canvas) {
        let ctx = this.getCtx(canvas);

        // 画背景
        ctx.fillStyle = "#FD0";
        ctx.fillRect(0, 0, 75, 75);
        ctx.fillStyle = "#6C0";
        ctx.fillRect(75, 0, 75, 75);
        ctx.fillStyle = "#09F";
        ctx.fillRect(0, 75, 75, 75);
        ctx.fillStyle = "#F30";
        ctx.fillRect(75, 75, 75, 75);
        ctx.fillStyle = "#FFF";

        // 设置透明度值
        ctx.globalAlpha = 0.2;

        // 画半透明圆
        for (var i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }

    drawLineWidth(canvas) {
        let ctx = this.getCtx(canvas);

        for (let i = 0; i < 10; i++) {
            ctx.lineWidth = 1 + i;
            ctx.beginPath();
            ctx.moveTo(20 + i * 10, 10);
            ctx.lineTo(20 + i * 10, 140);
            ctx.stroke();
            ctx.closePath();
        }
    }

    drawLineCap(canvas) {
        let ctx = this.getCtx(canvas);
        let lineCaps = ["butt", "round", "square"];
        //画基准线
        ctx.beginPath();
        ctx.strokeStyle = "#09f";
        ctx.moveTo(10, 10);
        ctx.lineTo(140, 10);
        ctx.moveTo(10, 140);
        ctx.lineTo(140, 140);
        ctx.stroke();
        ctx.closePath();
        //画线
        ctx.strokeStyle = "#000";
        ctx.lineWidth = "20";
        for (let i = 0; i < lineCaps.length; i++) {
            const linecap = lineCaps[i];
            ctx.beginPath();
            ctx.lineCap = linecap;
            ctx.moveTo(30 + i * 45, 10);
            ctx.lineTo(30 + i * 45, 140);
            ctx.stroke();
            ctx.fillText(linecap, 18 + i * 45, 175);
        }
        ctx.closePath();
    }

    drawLineDash(canvas) {
        //虚线
        let ctx = this.getCtx(canvas);
        ctx.clearRect(0, 0, 150, 150);
        ctx.setLineDash([4, 2]);
        ctx.lineDashOffset = -offset;
        ctx.strokeRect(10, 10, 130, 130);
    }

    march() {
        offset++;
        if (offset > 16) {
            offset = 0;
        }
        this.drawLineDash("canvasLDRef");
        this.dashTimer = setTimeout(this.march.bind(this), 20);
    }

    drawLinearGradient(canvas) {
        let ctx = this.getCtx(canvas);
        // Create gradients
        var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
        lingrad.addColorStop(0, "#00ABEB");
        lingrad.addColorStop(0.5, "#fff");
        lingrad.addColorStop(0.5, "#26C000");
        lingrad.addColorStop(1, "#fff");

        var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
        lingrad2.addColorStop(0.5, "#000");
        lingrad2.addColorStop(1, "rgba(0,0,0,0)");

        // assign gradients to fill and stroke styles
        ctx.fillStyle = lingrad;
        ctx.strokeStyle = lingrad2;

        // draw shapes
        ctx.fillRect(10, 10, 130, 130);
        ctx.strokeRect(50, 50, 50, 50);
    }

    drawPattern(canvas) {
        let ctx = this.getCtx(canvas);
        let img = new Image();
        img.src =
            "https://mdn.mozillademos.org/files/222/Canvas_createpattern.png";

        img.onload = function() {
            // 创建图案
            let ptrn = ctx.createPattern(img, "repeat");
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, 150, 150);
        };
    }

    drawShadow(canvas) {
        let ctx = this.getCtx(canvas);
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

        ctx.font = "20px Times New Roman";
        ctx.fillStyle = "Black";
        ctx.fillText("Sample String", 5, 30);
    }
    componentDidMount() {
        this.draw();
    }

    componentWillUnmount() {
        if (this.dashTimer) {
            clearTimeout(this.dashTimer);
        }
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

                <Card title="globalAlpha " className="wrap_card">
                    <canvas
                        ref={this.canvasGloRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="lineWidth  " className="wrap_card">
                    <canvas
                        ref={this.canvasLwRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="lineCap  " className="wrap_card">
                    <p>同样长度但是不同lineCap的线条</p>
                    <canvas
                        ref={this.canvasLcapRef}
                        id="tutorial"
                        width="150"
                        height="190"
                    ></canvas>
                </Card>

                <Card title="lineDash 虚线  " className="wrap_card">
                    <p>虚线动画</p>
                    <canvas
                        ref={this.canvasLDRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="createLinearGradient 的例子" className="wrap_card">
                    <p></p>
                    <canvas
                        ref={this.canvasLGRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="createPattern 的例子" className="wrap_card">
                    <p></p>
                    <canvas
                        ref={this.canvasPatternRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="shadow" className="wrap_card">
                    <p></p>
                    <canvas
                        ref={this.canvasShadowRef}
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
