import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const CameraCapture = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((error) => {
            console.error("Error playing video: ", error);
          });
        };
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    captureImage,
  }));

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setThumbnails((prevThumbnails) => [...prevThumbnails, dataUrl]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video ref={videoRef} style={{ width: "100%" }}></video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="640"
          height="480"
        ></canvas>
        <button onClick={captureImage} style={{ margin: "10px" }}>
          Capture Image
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Thumbnail ${index}`}
            style={{ width: "100px", height: "auto", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
});

export default CameraCapture;
