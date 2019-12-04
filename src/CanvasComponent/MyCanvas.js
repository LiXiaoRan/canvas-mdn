import React, { Component } from "react";
import "./MyCanvas.less";
import { Card } from "antd";
class MyCanvas extends Component {
    constructor(props) {
        super(props);
        this.draw = this.draw.bind(this);
        this.canvasRef = React.createRef();
        this.canvasTriRef = React.createRef();
        this.canvasArcRef = null;
        this.state = {};
    }
    draw() {
        let canvas = this.canvasRef.current;
        if (canvas.getContext) {
            //矩形
            let ctx = canvas.getContext("2d");

            ctx.fillRect(25, 25, 100, 100);
            ctx.clearRect(35, 35, 80, 80);
            ctx.strokeRect(45, 45, 60, 60);
        }

        let canvasTriRef = this.canvasTriRef.current;
        if (canvasTriRef) {
            let ctx = canvasTriRef.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(100, 25);
            ctx.lineTo(100, 75);
            ctx.fill();

            // 描边三角形
            ctx.beginPath();
            ctx.moveTo(125, 125);
            ctx.lineTo(125, 45);
            ctx.lineTo(45, 125);
            ctx.closePath();
            ctx.stroke();
        }

        if (this.canvasArcRef) {
            //圆弧

            let ctx = this.canvasArcRef.getContext("2d");
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.beginPath();
                    var x = 25 + j * 50; // x 坐标值
                    var y = 25 + i * 50; // y 坐标值
                    var radius = 20; // 圆弧半径
                    var startAngle = 0; // 开始点
                    var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
                    var anticlockwise = i % 2 === 0 ? false : true; // 顺时针或逆时针

                    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

                    if (i > 1) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                }
            }
        }

        if (this.canvasQuadRef) {
            //二次贝塞尔曲线
            let ctx = this.canvasQuadRef.getContext("2d");
            // 二次贝塞尔曲线
            ctx.beginPath();
            ctx.moveTo(75, 25);
            ctx.quadraticCurveTo(25, 25, 25, 62.5);
            ctx.quadraticCurveTo(25, 100, 50, 100);
            ctx.quadraticCurveTo(50, 120, 30, 125);
            ctx.quadraticCurveTo(60, 120, 65, 100);
            ctx.quadraticCurveTo(125, 100, 125, 62.5);
            ctx.quadraticCurveTo(125, 25, 75, 25);
            ctx.stroke();
        }

        if (this.canvasCurRef) {
            //三次贝塞尔曲线
            let ctx = this.canvasCurRef.getContext("2d");
            //三次贝塞尔曲线
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctx.fill();
        }

        if (this.canvasPath2dRef) {
            let ctx = this.canvasPath2dRef.getContext("2d");
            let rectangle = new Path2D();
            rectangle.rect(10, 10, 50, 50);

            let circle = new Path2D();
            circle.moveTo(125, 35);
            circle.arc(100, 35, 25, 0, 2 * Math.PI);

            ctx.stroke(rectangle);
            ctx.fill(circle);
        }
    }

    render() {
        return (
            <div className="root_container">
                <Card title="基础矩形" className="wrap_card">
                    <canvas
                        ref={this.canvasRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="绘制一个三角形" className="wrap_card">
                    <p>
                        - `beginPath()`
                        新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
                        - `closePath()`
                        闭合路径之后图形绘制命令又重新指向到上下文中。 -
                        `stroke()` 通过线条来绘制图形轮廓。 - `fill()`
                        通过填充路径的内容区域生成实心的图形。
                        生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，
                        所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新
                        绘制新的图形。
                    </p>
                    <canvas
                        ref={this.canvasTriRef}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="圆弧" className="wrap_card">
                    <p>
                        x,y坐标是可变的。半径（radius）和开始角度（startAngle）都是固定的。结束角度（endAngle）在第一列开
                        始时是180度（半圆）然后每列增加90度。最后一列形成一个完整的圆。
                    </p>
                    <canvas
                        ref={ele => (this.canvasArcRef = ele)}
                        id="tutorial"
                        width="150"
                        height="200"
                    ></canvas>
                </Card>

                <Card title="二次贝塞尔曲线" className="wrap_card">
                    <canvas
                        ref={ele => (this.canvasQuadRef = ele)}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="三次贝塞尔曲线" className="wrap_card">
                    <canvas
                        ref={ele => (this.canvasCurRef = ele)}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>

                <Card title="Path2D" className="wrap_card">
                    <p>新的Path2D API有另一个强大的特点，就是使用SVG path data来初始化canvas上的路径。这将使你获取路径时可以以SVG或canvas的方式来重用它们。</p>
                    <canvas
                        ref={ele => (this.canvasPath2dRef = ele)}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this.draw();
    }
}

export default MyCanvas;
