import * as React from "react";
import {useState} from "react";
import {Home} from "./components/Home"
import Flashcards from "./components/Flashcards"
import TestPage from "./components/TestPage";
import ScoreDisplay from "./components/ScoreDisplay";
import logo from "./official_ASL_logo.png";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [homeHovered, setHomeHovered] = useState(false);
  const [homeClicked, setHomeClicked] = useState(false);

  const [learnHovered, setLearnHovered] = useState(false);
  const [learnClicked, setLearnClicked] = useState(false);

  const [testHovered, setTestHovered] = useState(false);
  const [testClicked, setTestClicked] = useState(false);

  const [LOHovered, setLOHovered] = useState(false);
  const [LOClicked, setLOClicked] = useState(false);

 return(
<div className="app-container">
<div style={(styles.navBarBackground)}className = "header">
<img src={logo} alt="AL Logo" style={styles.navBarImg} />

        <div style={styles.navButtonsRow}>
          <button
            style={{
              ...styles.navBarButton,
              backgroundColor: homeHovered ? "#F4E7D3" : "transparent",
              color: homeHovered ? "#4A2511" : "#F4E7D3",
              borderRadius: "6px",
              transform: homeClicked ? "scale(0.95)" : "scale(1)",
            }}
            onMouseEnter={() => setHomeHovered(true)}
            onMouseLeave={() => setHomeHovered(false)}
            onMouseDown={() => setHomeClicked(true)}
            onMouseUp={() => setHomeClicked(false)}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </button>

          <button
            style={{
              ...styles.navBarButton,
              backgroundColor: learnHovered ? "#F4E7D3" : "transparent",
              color: learnHovered ? "#4A2511" : "#F4E7D3",
              borderRadius: "6px",
              transform: learnClicked ? "scale(0.95)" : "scale(1)",
            }}
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            onMouseDown={() => setLearnClicked(true)}
            onMouseUp={() => setLearnClicked(false)}
            onClick={() => setActiveTab("Flashcards")}
          >
            Learn
          </button>

          <button
            style={{
              ...styles.navBarButton,
              backgroundColor: testHovered ? "#F4E7D3" : "transparent",
              color: testHovered ? "#4A2511" : "#F4E7D3",
              borderRadius: "6px",
              transform: testClicked ? "scale(0.95)" : "scale(1)",
            }}
            onMouseEnter={() => setTestHovered(true)}
            onMouseLeave={() => setTestHovered(false)}
            onMouseDown={() => setTestClicked(true)}
            onMouseUp={() => setTestClicked(false)}
            onClick={() => setActiveTab("TestPage")}
          >
            Test
          </button>

        </div>

  <div style={{ width: "60px" }}></div>  {/* Spacer to center buttons */}
  <button
  style={{
    ...styles.logoutButton,
  backgroundColor: LOHovered ? "#F4E7D3" : "transparent",
              color: LOHovered ? "#4A2511" : "#F4E7D3",
              transform: LOClicked ? "scale(0.95)" : "scale(1)",}}
  onClick={() => console.log("Logout clicked")}  //TO AASTHA ADD LOGIC HERE!!!!!
            onMouseEnter={() => setLOHovered(true)}
            onMouseLeave={() => setLOHovered(false)}
            onMouseDown={() => setLOClicked(true)}
            onMouseUp={() => setLOClicked(false)}
            //onClick={() => setActiveTab("LogicPage")} TO AASTHA MAKE THIS PAGE AND IMPLEMENT LOGIC!!!!
>
  Logout
</button>
</div>

<div className="content">
  {activeTab === "Home" && <Home />}
  {activeTab === "Flashcards" && <Flashcards />}
  {activeTab === "TestPage" && <TestPage />}

</div>

</div>


);
};
export default App;

const styles: {[key: string]: React.CSSProperties}={
  navBarBackground:{
    backgroundColor: "#5e3023", 
    display: "flex",
    flexDirection: "row",  
    //justifyContent: "space-between",   // horizontally center children
    alignItems: "center",       // vertically center children
    padding: "0 20px",
    height: "130px",
    boxSizing: "border-box",
  },

  navBarTitle: {
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

  navBarImg: {
    width: "auto",
    height: "180px",
    marginBottom: "0px",
  },

  logoutButton:{
    border: "1px solid #F4E7D3",
    backgroundColor: "transparent",
    color: "#F4E7D3",
    fontFamily: "Comic Sans Ms, Comic Sans, cursive",
    fontSize: "20px",
    padding: "8px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "auto",
    marginTop: "-20px",
    transition: "0.2s"
  }
};
