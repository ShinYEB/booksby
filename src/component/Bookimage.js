import React, {useEffect, useState} from "react";
import axios from "axios";

function Bookimage(props){
    
    const [link, setlink] = useState("x")

    const tmpstyle = {
        margin:"10px",
        width:"200px",
        height:"260px",
        border:"1px solid black",
        display:"flex",
        
    }

    const imgcenter = {
        margin:"auto",
    }

    useEffect(() => {
        const link1 = "http://34.64.95.170:8080/search/" + props.idx
        axios.get(link1)
        .then(function(responseHandler){
            const tmp = responseHandler.data
            setlink(tmp)
        })
    }, [props.asin])

    return<div style={tmpstyle}>
        {(link != "x") && <div style={imgcenter}><img src={link} style={{height:"240px", width:"180px"}}/></div>}
    </div>
}

export default Bookimage