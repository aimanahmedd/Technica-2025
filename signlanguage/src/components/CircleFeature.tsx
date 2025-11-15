import React, { CSSProperties } from "react";

interface CircleFeature{
  featureName: string;
}

export const CircleFeature: React.FC<CircleFeature> = ({ featureName }) => {
  return (
    <div style={(styles.page)}>
      {/* Circle */}
      <div style={(styles.circlestyle)}>
        Coming Soon!
      </div>

      {/* Feature label */}
      <div style={(styles.forFeature)}>
        {featureName}
      </div>
    </div>
  );
};

const styles:{[key:string]: CSSProperties} = {
    page:{
        textAlign: "center",
        margin: "20px"
    },
    circlestyle:{
        width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          color: "#999797ff",
          margin: "0 auto",
    },
    forFeature:{
marginTop: "10px",
 fontSize: "1rem",
  color: "#333"
    }
}
