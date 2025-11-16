import React, { CSSProperties } from "react";
import { CircleFeature } from "./CircleFeature";


export const Home = () => {
return( 
    <div style={(styles.page)}>
    <h1>Welcome to ASLearn!</h1>
    
    <br></br>
    <h2 style={styles.headingStyle}>Our Mission</h2>
    <p style={styles.paragraphStyle}>
        At ASLearn, our goal is ACCESSIBILITY, SUPPORT, and LEARNING! We want to make it easier for YOU to learn ASL no matter your circumstance.
        Whether you are a beginner just starting out or longtime ASL fluent brushing up on your skills, our platform provides clear lessons and tools
        to guide you every step of the way. Learning ASL should be fun and achievable for everyone, and that is what we are here to make happen❤️.
    </p>

    <div
        style={{
            display:"flex",
            justifyContent: "center",
            gap: "42px",
            marginTop: "40px"
        }}
        >
    <CircleFeature featureName="Alphabet" />
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
        justifyContent: "flex-start",
        padding: "20px",
        fontSize: "32px",
        fontFamily: "Comic Sans MS, Comic Sans, cursive",
        color: '#5A3E2B',

    },
    headingStyle: {
    fontSize: '32px',
    color: '#5A3E2B',
    marginTop: 0,
    marginBottom: 10, 
  },
  paragraphStyle: {
    marginTop: "20px",
    color:"#5A3E2B",
    fontSize: "24px",
    width: "1000px",
     marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
  }

}
