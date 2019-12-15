import React, { Component } from "react";
import { Card } from "antd";
import "./ImgCanvas.less";

export default class ImaCanvas extends Component {
    getCtx(ref) {
        if (this[ref].current) {
            return this[ref].current.getContext("2d");
        }
    }

    draw() {
        this.drawImageCan();
    }

    drawImageCan() {
        let ctx = this.canvasRefDrCa.getContext("2d");
        let img = new Image();
        img.src="https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/27.jpg";
        img.onload = function() {
            ctx.drawImage(img, 0, 0,150,150);
            ctx.beginPath();
            ctx.moveTo(30, 96);
            ctx.lineTo(70, 66);
            ctx.lineTo(103, 76);
            ctx.lineTo(170, 15);
            ctx.stroke();
        };
    }
    componentDidMount() {
        this.draw();
    }

    render() {
        return (
            <div className="root_container">
                <Card title="drawImage和canvas的绘制结合" className="wrap_card">
                    <canvas
                        ref={ele => (this.canvasRefDrCa = ele)}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>
            </div>
        );
    }
}
