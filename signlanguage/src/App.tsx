import * as React from "react";
import {useState} from "react";
import {Home} from "./components/Home"
import Flashcards from "./components/Flashcards"
import logo from "./official_ASL_logo.png";


function App() {
 const [activeTab, setActiveTab] = useState("Home");
  const [homeHovered, setHomeHovered] = useState(false);
  const [homeClicked, setHomeClicked] = useState(false);

  const [learnHovered, setLearnHovered] = useState(false);
  const [learnClicked, setLearnClicked] = useState(false);

 return(
<div className="app-container">
<div style={(styles.navBarBackground)}className = "header">
<img src={logo} alt="AL Logo" style={styles.navBarImg} />


<div style={styles.navButtonsRow}>
    <button style={{...styles.navBarButton,
      backgroundColor: homeHovered ? "#F4E7D3" : "transparent", 
       color: homeHovered ? "#4A2511" : "#F4E7D3",
      transform: homeClicked ? "scale(0.95)" : "scale(1)"
    }} 
    onMouseEnter={() => setHomeHovered(true)}
  onMouseLeave={() => setHomeHovered(false)}
  onMouseDown={() => setHomeClicked(true)}
  onMouseUp={() => setHomeClicked(false)}
  onClick={() => setActiveTab("Home")}>Home</button>

    <button style={{...styles.navBarButton,
      backgroundColor: learnHovered ? "#F4E7D3" : "transparent", 
       color: learnHovered ? "#4A2511" : "#F4E7D3",
      transform: learnClicked ? "scale(0.95)" : "scale(1)"
    }} 
    onMouseEnter={() => setLearnHovered(true)}
  onMouseLeave={() => setLearnHovered(false)}
  onMouseDown={() => setLearnClicked(true)}
  onMouseUp={() => setLearnClicked(false)}
  onClick={() => setActiveTab("Flashcards")}>Learn</button>


</div>
<div style={{width:"60px"}}></div>
</div>

<div className="content">
  {activeTab === "Home" && <Home />}
  {activeTab === "Flashcards" && <Flashcards />}

</div>
</div>
);
};

const styles: {[key: string]: React.CSSProperties}={
  navBarBackground:{
    backgroundColor: "#5e3023", 
    display: "flex",
      flexDirection: "row",  
    //justifyContent: "space-between",   // horizontally center children
    alignItems: "center",       // vertically center children
    padding: "0 20px",
    height: "80x",
    boxSizing: "border-box",
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
  gap: "75px",                // spacing between them
  justifyContent: "center",
  alignItems: "center",
  flex:1,
},

navBarButton:{
  border: "1px solid #5E3023",
  backgroundColor: "rgba(0,0,0,0)",
  color:"#F4E7D3",
  fontFamily: "Comic Sans MS, Comic Sans, cursive",
  fontSize: "24px",
  cursor: "pointer",
  justifyContent: "flex-start",
  marginTop: "-20px"

},

navBarImg:{
  width: "auto",
  height: "180px",
  marginBottom: "0px"
}
};
export default App;

