import { useRef, useState } from "react";

function ReportAnimal() {
  const videoRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setCameraOpen(true);
    } catch (error) {
      console.error("Camera error:", error);
      alert("Unable to display the camera.");
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      alert("Camera is not ready yet. Please wait a moment.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setPhoto(canvas.toDataURL("image/png"));
  };

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    videoRef.current.srcObject = null;
    setCameraOpen(false);
  };

  return (
    <div className="page">
      <h1>Report a Stray Animal 🐶🐱</h1>

      <p>
        Take a photo of a stray cat or dog that needs help.
      </p>

      <div className="report-form">

        <button
          type="button"
          className="btn"
          onClick={openCamera}
        >
          📷 Open Camera
        </button>

        {/* CAMERA */}
        <div
          style={{
            display: cameraOpen ? "block" : "none",
            marginTop: "20px",
          }}
        >
          <h3>Camera Preview</h3>

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              display: "block",
              width: "100%",
              maxWidth: "600px",
              height: "400px",
              objectFit: "cover",
              backgroundColor: "black",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />

          <div style={{ marginTop: "15px" }}>
            <button
              type="button"
              className="btn"
              onClick={takePhoto}
            >
              📸 Take Photo
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={closeCamera}
              style={{ marginLeft: "10px" }}
            >
              ❌ Close Camera
            </button>
          </div>
        </div>

        {/* CAPTURED PHOTO */}
        {photo && (
          <div style={{ marginTop: "25px" }}>
            <h3>Captured Photo</h3>

            <img
              src={photo}
              alt="Captured animal"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <label>Animal Type</label>

        <select>
          <option>Dog</option>
          <option>Cat</option>
          <option>Other</option>
        </select>

        <label>Location</label>

        <input
          type="text"
          placeholder="Where did you see the animal?"
        />

        <label>Description</label>

        <textarea
          rows="5"
          placeholder="Describe the animal..."
        ></textarea>

        <button
          type="button"
          className="btn"
        >
          Submit Report
        </button>

      </div>
    </div>
  );
}

export default ReportAnimal;