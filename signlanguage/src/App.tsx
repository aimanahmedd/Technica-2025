import * as React from "react";
import {useState} from "react";
import {Home} from "./components/Home"

function App() {
 const [activeTab, setActiveTab] = useState("Home");
 const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

 return(
<div className="app-container">
<div style={(styles.navBarBackground)}className = "header">
<h1 style={(styles.navBarTitle)}>ASLearn Time!</h1>
<div style={styles.navButtonsRow}>
    <button style={{...styles.navBarButton,
      backgroundColor: hovered ? "#F4E7D3" : "transparent", 
       color: hovered ? "#4A2511" : "#F4E7D3",
      transform: clicked ? "scale(0.95)" : "scale(1)"
    }} 
    onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onMouseDown={() => setClicked(true)}
  onMouseUp={() => setClicked(false)}
  onClick={() => setActiveTab("Home")}>Home</button>

</div>
</div>

<div className="content">
  {activeTab === "Home" && <Home />}
</div>
</div>
);
};

const styles: {[key: string]: React.CSSProperties}={
  navBarBackground:{
    backgroundColor: "#4A2511", 
    display: "flex",
      flexDirection: "column",  
    justifyContent: "center",   // horizontally center children
    alignItems: "center",       // vertically center children
    padding: "10px",
  },

  navBarTitle:{
    color: "#F4E7D3",
    marginRight: "20px",  
    fontSize: "32px",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",

  },
navButtonsRow: {
  display: "flex",
  flexDirection: "row",      // buttons side-by-side
  gap: "15px"                 // spacing between them
},

navBarButton:{
  border: "1px solid #4A2511",
  backgroundColor: "rgba(0,0,0,0)",
  color:"#F4E7D3",
  fontFamily: "Comic Sans MS, Comic Sans, cursive",
  fontSize: "24px",
  cursor: "pointer"

}
}

export default App;
