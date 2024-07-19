import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictaphone from "./Speech";
import CameraCapture from "./Camera";

function App() {
  const cameraRef = useRef(null);

  const handleCaptureImage = () => {
    if (cameraRef.current) {
      cameraRef.current.captureImage();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Dictaphone onCaptureImage={handleCaptureImage} />
        <CameraCapture ref={cameraRef} />
      </header>
    </div>
  );
}

export default App;
