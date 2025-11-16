import React, { CSSProperties } from "react";
import { CircleFeature } from "./CircleFeature";
import ScoreDisplay from "./ScoreDisplay";


export const Home = () => {
return( 
    <div style={(styles.page)}>
    <h1>Welcome to Excel ASL!</h1>
    
    <br></br>
    <h2 style={styles.headingStyle}>Our Mission</h2>
    <p style={styles.paragraphStyle}>
        At Excel ASL, our mission is simple: ACCESSIBILITY, SUPPORT, and LEARNING for everyone. 
        We believe that learning American Sign Language should be empowering, fun, and within reach no matter your background or circumstances. 
        We aim to offer clear, engaging lessons and smart tools so you can practice confidently from the comfort of your home. 
        By removing barriers and making ASL more approachable, we’re building a more inclusive world where signing is embraced and understood ❤️.

    </p>

    <div
        style={{
            display:"flex",
            justifyContent: "center",
            gap: "42px",
            marginTop: "40px"
        }}
        >
    <div><ScoreDisplay/></div>
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
