import React, { CSSProperties } from "react";
import { CircleFeature } from "./CircleFeature";


export const Home = () => {
return( 
    <div style={(styles.page)}>
    <h1>Welcome to ASLearn!</h1>
    
    <br></br>
    <h2 style={styles.headingStyle}>Our Mission</h2>
    <p style={styles.paragraphStyle}>
        Our mission is blah blah blah
    </p>

    <div
        style={{
            display:"flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "40px"
        }}
        >
    <CircleFeature featureName="Family" />
    <CircleFeature featureName="Work and Professional" />
    </div>
    </div>
)
};

const styles: {[key:string]: CSSProperties} = {
    page:{
        background: "#F4E7D3",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontSize: "32px",
        fontFamily: "Comic Sans MS, Comic Sans, cursive",
        color: '#5A3E2B',

    },
    headingStyle: {
    fontSize: '1.5rem',
    color: '#5A3E2B',
  },
  paragraphStyle: {
    marginTop: "20px",
    color:"#5A3E2B",
    fontSize: "28px",
    fontWeight:"bold",
  }

}
