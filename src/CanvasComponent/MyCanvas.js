import React, { Component } from 'react';
import './MyCanvas.less'
class MyCanvas extends Component {
    constructor(props) {
        super(props);
        this.draw=this.draw.bind(this);
        this.canvasRef=React.createRef();
        this.state={

        }
    }
     draw(){
        let canvas = this.canvasRef.current;
        if (canvas.getContext){
          let ctx = canvas.getContext('2d');

          ctx.fillRect(25,25,100,100);
          ctx.clearRect(35,35,80,80);
          ctx.strokeRect(45,45,60,60)  ;

        }
      }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} id="tutorial" width="150" height="150"></canvas>
            </div>
        );
    }

    componentDidMount(){
        this.draw();
    }
}


export default MyCanvas;