import React, {useEffect, useState} from "react";
import ProgressCircle from "./ProgressCircle";


function ScoreDisplay(){
    const [score, setScore] = useState(0);
    const [percent, setPercent] = useState(0);

useEffect(() =>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}/progress`)
    .then((res) => res.json())
    .then((data)=>{
        setScore(data.progress);
        setPercent((data.progress / 26) * 100);
    })
    .catch((err)=>console.log(err));
}, []);

return(
    <div style = {{display: "flex", flexDirection: "column", alignItems:"center", gap:"1rem"}}>
        <ProgressCircle/>
    </div>
    
);
}

export default ScoreDisplay;