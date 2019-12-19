import React, { Component } from "react";
import { Card } from "antd";
import "./CanvasTrans.less";

export class CanvasTrans extends Component {
    componentDidMount() {
        this.draw();
    }

    draw() {
        this.savenresTest();
    }

    /**
     * save 和 restore 绘制重叠矩形
     */
    savenresTest() {
        let ctx = this.stref.getContext("2d");

        ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
        ctx.save(); // 保存默认状态

        ctx.fillStyle = "#09F"; // 在原有配置基础上对颜色做改变
        ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形
        ctx.save();

        ctx.fillStyle = "#fff"; // 再次改变颜色配置
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90); //使用新配置绘制矩形

        ctx.restore(); // 重新加载之前的颜色状态,第二次save代码之前的状态
        ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形

        ctx.restore(); // 加载默认颜色配置
        ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形
    }

    render() {
        return (
            <div className=".root_container">
                <Card
                    title="save 和 restore 绘制重叠矩形"
                    className="wrap_card"
                >
                    <canvas
                        ref={ele => (this.stref = ele)}
                        id="tutorial"
                        width="150"
                        height="150"
                    ></canvas>
                </Card>
            </div>
        );
    }
}

export default CanvasTrans;
