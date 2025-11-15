import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function TestPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("");
  const [letter, setLetter] = useState<string>("A");
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    // cleanup when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamStarted(true);
    } catch (err) {
      console.error("Camera start failed:", err);
      setStatus("Camera permission denied or no camera available.");
    }
  };

  const captureAndCheck = async () => {
    if (!videoRef.current) {
      setStatus("Start the camera first.");
      return;
    }
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.8));
    if (!blob) {
      setStatus("Failed to capture frame.");
      return;
    }

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");
    formData.append("letter", letter);

    try {
      setStatus("Checking...");
      const res = await axios.post("http://localhost:8000/check", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const correct = res.data?.correct;
      setStatus(correct ? "✅ Correct!" : "❌ Try again.");
    } catch (err) {
      console.error(err);
      setStatus("Error contacting backend. Is it running?");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>ASL Practice — Test Page</h2>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={480}
          height={360}
          style={{ border: "1px solid #ccc", borderRadius: 6 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        {!streamStarted ? (
          <button onClick={startCamera} style={{ marginRight: 8 }}>Start Camera</button>
        ) : (
          <button onClick={captureAndCheck} style={{ marginRight: 8 }}>Check ASL</button>
        )}
        <input
          value={letter}
          onChange={(e) => setLetter(e.target.value.toUpperCase().slice(0, 1))}
          style={{ width: 40, textAlign: "center" }}
          maxLength={1}
        />
        <span style={{ marginLeft: 8 }}>Expected Letter</span>
      </div>

      <p style={{ marginTop: 12 }}>{status}</p>

      <p style={{ fontSize: 12, color: "#666" }}>Note: This is a demo heuristic using MediaPipe. For production use a trained ASL classifier.</p>
    </div>
  );
}
