import React, { Component } from 'react';
import './MyCanvas.less'
class MyCanvas extends Component {
    constructor(props) {
        super(props);
        this.draw=this.draw.bind(this);
        this.canvasRef=React.createRef()
        this.state={

        }
    }
     draw(){
        let canvas = this.canvasRef.current;
        if (canvas.getContext){
          let ctx = canvas.getContext('2d');
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