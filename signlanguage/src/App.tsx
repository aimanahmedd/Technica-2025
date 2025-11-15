import * as React from "react";
import {useState} from "react";
import {Home} from "./components/Home"

function App() {
 const [activeTab, setActiveTab] = useState("home");

 return(
<div className="app-container">
<div style={(styles.navBarBackground)}className = "header">
<h1 style={(styles.navBarTitle)}>ASLearn Time!</h1>
<div style={styles.navButtonsRow}>
    <button onClick={() => setActiveTab("home")}>Home</button>

</div>
</div>

<div className="content">
  {activeTab === "home" && <Home />}
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
  },
navButtonsRow: {
  display: "flex",
  flexDirection: "row",      // buttons side-by-side
  gap: "15px"                 // spacing between them
}
}

export default App;
