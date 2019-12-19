import React from 'react';
import './App.css';
import MyCanvas from './CanvasComponent/CanvasShape';
import ColorCanvas from "./CanvasComponent/ColorCanvas";
import ImaCanvas from './CanvasComponent/ImaCanvas'
import CanvasTrans from './CanvasComponent/CanvasTrans';

function App() {
  return (
    <div className="App">
      <CanvasTrans />
    </div>
  );
}

export default App;
