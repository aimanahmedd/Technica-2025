import React, {useEffect, useState, CSSProperties} from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getUserId } from "../utils/getUserId";

const userId = getUserId();

function ProgressCircle(){
    const [progress, setProgress] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/progress?user_id=${userId}`)
        .then(res => res.json())
        .then(data=>{
            setProgress(data.progress);
            setPercent((data.progress/26) *100);
        })
        .catch(err=>console.error(err));
}, []);

return(
    <div style={(styles.circle)}>
        <CircularProgressbar
        value={percent}
        text={`${percent.toFixed(0)}%`}

        styles = {buildStyles({
            textSize: '16px',
            pathColor: '#4caf50',
            textColor: '#333',
            trailColor: '#ccc',
            strokeLinecap: 'round'
        })}
        />
      <div style={(styles.forFeature)}>
        Alphabet
      </div>

    </div>
)
}

const styles: {[key:string]: CSSProperties} = {
    circle:{
        width: 150,
        height: 150,
        marginTop: "20px"
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
  },

    forFeature:{
    alignItems: "center",
    marginTop: "10px",
    fontSize: "1rem",
    color: "#5A3E2B",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    }
}

export default ProgressCircle;
