import React from 'react';
import Learn from './Flashcards';
import Test from './TestPage';
import { CSSProperties } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Practice() {
useEffect(() => {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/test?test_state=false`);
}, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Practice what you've learned!</h1>
      <div style={styles.row}>
        <div style={styles.column}><Learn /></div>
        <div style={styles.column}><Test /></div>
      </div>
    </div>
  );
}

const styles: {[key: string]: CSSProperties} = {
  page:{
    background: "#F4E7D3",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",  // ✔ header stays at top
    padding: "20px",
    fontSize: "32px",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    color: '#5A3E2B',
  },

  title: {
    width: "100%",
    textAlign: "center",   // better centering
    marginBottom: "30px",
  },

  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "40px",
  },

  column: {
    flex: 1,
    maxWidth: "600px",
  },
};

export default Practice;
