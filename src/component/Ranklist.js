import React, {useCallback, useState, useEffect} from "react";
import Bookcover from "./Bookcover";
import axios from "axios";

function Ranklist(props){
    
    const tmpstyle1 = {
        overflow: "flex",
        width: "100%",
        height: "440px",
        display: 'flex',
        flexDirection:"row",
        overflow:"auto",
    }

    const tmpstyle2 = {
        width:"100%",
        height:"500px",
        margin: "auto",
        padding:"20px",
        borderRadius:"10px",
    }

    const rlist = props.li 

    return<div style={tmpstyle2}>
        <h2>맞춤 책 추천</h2>
        <div style={tmpstyle1}>
            {(rlist.length > 5) && <Bookcover idx={rlist[0]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[1]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[2]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[3]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[4]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[5]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[6]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[7]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[8]}/>}
            {(rlist.length > 5) && <Bookcover idx={rlist[9]}/>}
    </div></div>

}  

export default Ranklist