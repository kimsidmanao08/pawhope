import { useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (error) {
      alert("Camera access was denied or is not available.");
      console.error(error);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setPhoto(image);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    videoRef.current.srcObject = null;
    setCameraOn(false);
  };

  return (
    <div className="camera">

      <h2>📷 Take Animal Photo</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      ></video>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      ></canvas>

      <div className="camera-buttons">

        {!cameraOn ? (
          <button onClick={startCamera} className="btn">
            Open Camera
          </button>
        ) : (
          <>
            <button onClick={takePhoto} className="btn">
              📸 Take Photo
            </button>

            <button onClick={stopCamera} className="btn secondary">
              Stop Camera
            </button>
          </>
        )}

      </div>

      {photo && (
        <div className="photo-result">
          <h3>Captured Photo</h3>

          <img
            src={photo}
            alt="Captured stray animal"
          />

          <a
            href={photo}
            download="pawhope-animal.png"
            className="btn"
          >
            Save Photo
          </a>
        </div>
      )}

    </div>
  );
}

export default Camera;