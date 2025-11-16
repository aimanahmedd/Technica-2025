import { useState, CSSProperties } from "react";

// Import all 26 ASL letter images from src/Flashcards/
import A from "../Flashcards/A.png";
import B from "../Flashcards/B.png";


// Map letters to their images
const ASL_IMAGES: Record<string, string> = {
  A,B
};

export default function Flashcards() {
  const letters = Object.keys(ASL_IMAGES);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % letters.length);
  const prev = () => setIndex((i) => (i - 1 + letters.length) % letters.length);

  const letter = letters[index];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ASL Flashcards</h1>

      <div style={styles.cardContainer}>
        <img src={ASL_IMAGES[letter]} alt={`ASL letter ${letter}`} style={styles.image} />
        <h2 style={styles.letterText}>{letter}</h2>
      </div>

      <div style={styles.buttons}>
        <button onClick={prev} style={styles.button}>⟵ Previous</button>
        <button onClick={next} style={styles.button}>Next ⟶</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: {
    background: "#F4E7D3",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    color: "#5A3E2B",
    fontSize: "32px",
    marginBottom: "20px",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
  },
  cardContainer: {
    background: "#E3CBB4",
    borderRadius: "18px",
    padding: "30px",
    width: "420px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "260px",
    height: "260px",
    objectFit: "contain",
  },
  letterText: {
    marginTop: "20px",
    color: "#5A3E2B",
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "420px",
    marginTop: "20px",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
  },
  button: {
    padding: "12px 20px",
    background: "#8B5E3C",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
    margin: "0 8px",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
  },
};
