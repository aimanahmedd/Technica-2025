import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { getUserId } from "../utils/getUserId";
import axios from "axios";

const userId = getUserId();

export default function TestPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("");
  const [letter, setLetter] = useState<string>("A");
  const [streamStarted, setStreamStarted] = useState(false);

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const [orderedMode, setOrderedMode] = useState(true); // toggle
const [index, setIndex] = useState(0); // current letter index

useEffect(() => {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/test?test_state=true`);
}, []);

  useEffect(() => {
      setLetter(LETTERS[index]);
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
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

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.8)
    );
    if (!blob) {
      setStatus("Failed to capture frame.");
      return;
    }

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");
    formData.append("letter", letter);
    formData.append("user_id", userId);

    try {
      setStatus("Checking...");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const correct = res.data?.correct;
      if (correct) {
      setStatus("✅ Correct!");
      // ---- AUTO MOVE TO NEXT LETTER ----
      setTimeout(() => {
        let nextIndex;

        if (orderedMode) {
          nextIndex = (index + 1) % LETTERS.length;
        } else {
          nextIndex = Math.floor(Math.random() * LETTERS.length);
        }

        setIndex(nextIndex);
        setLetter(LETTERS[nextIndex]);
      }, 1000);
    } else {
      setStatus("❌ Try again.");
    }
    } catch (err) {
      console.error(err);
      setStatus("Error contacting backend. Is it running?");
    }
  };

const skipLetter = () => {
  let nextIndex;

  if (orderedMode) {
    nextIndex = (index + 1) % LETTERS.length;
  } else {
    nextIndex = Math.floor(Math.random() * LETTERS.length);
  }

  setIndex(nextIndex);
  setLetter(LETTERS[nextIndex]);

  setStatus("⏭️ Skipped!");
};


  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ASL Test Page</h1>

      <div style={styles.card}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={420}
          height={320}
          style={styles.video}
        />

      <div style={styles.wide}>
          <div style={styles.controls}>
          {!streamStarted ? (
            <button onClick={startCamera} style={{ ...styles.button, fontSize: "24px" }}>
              Start Camera
            </button>
          ) : (
            <button onClick={captureAndCheck} style={{ ...styles.button, fontSize: "24px" }}>
              Check Answer
            </button>
          )}
          <div style={{ fontSize: "64px", fontWeight: "bold", color: "#5A3E2B" }}>
            {letter}
            
          </div>
          </div>
        </div>

      <p style={styles.status}>{status}</p>

      <div style={styles.bottom}>
        <button
          onClick={skipLetter}
          style={{ ...styles.button, background: "#A67B5B" }}
        >
          Skip
        </button>

        <button
          onClick={() => setOrderedMode(!orderedMode)}
          style={{ ...styles.button, background: "#6B4423" }}
        >
          Mode: {orderedMode ? "Ordered" : "Random"}
        </button>
      </div>

      </div>

      <p style={styles.note}>
        Note: This is a demo heuristic.
      </p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#F4E7D3",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 20px",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  title: {
    color: "#5A3E2B",
    fontSize: "32px",
    marginBottom: "20px",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
  },
  card: {
    background: "#E3CBB4",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.18)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "450px",
  },
  video: {
    borderRadius: "12px",
    border: "4px solid #C9B09A",
    objectFit: "cover",
  },
  
  button: {
    padding: "12px 18px",
    background: "#8B5E3C",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  input: {
    width: "40px",
    height: "40px",
    fontSize: "20px",
    textAlign: "center",
    borderRadius: "8px",
    border: "2px solid #8B5E3C",
    background: "#FDF5ED",
    color: "#5A3E2B",
    outline: "none",
  },
  label: {
    color: "#5A3E2B",
    fontSize: "16px",
  },
  status: {
    marginTop: "15px",
    fontSize: "25px",
    color: "#5A3E2B",
    fontWeight: "bold",
  },
  note: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#5A3E2B",
  },
  wide: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  },
    bottom: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center"
  },
  controls: {
    width: "70%",
    marginTop: "18px",
    fontSize: "30px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    //gap: "10px",
  },
};
