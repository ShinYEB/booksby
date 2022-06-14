import React, {useState, useEffect} from 'react';
import Bookimage from './Bookimage';
import Booktitle from './Booktitle';
import Modal from "react-modal";
import axios from 'axios';

function Bookcover(props){
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [titles, settitle] = useState("x")
    const [items, setitem] = useState([])
    
    const boardstyle = {
        width:"222px",
        height:"390px",
        margin:"10px",
        borderRadius:"10px",
        flexShrink: "0",
        background: "white",
    }

    const tmpstyle = {
        width:"222px",
        height:"392px",
        border:"1px solid black",
        //margin:"10px",
        borderRadius:"10px",
        flexShrink: "0",
        background: "white",
    }

    const modalstyle = {
        
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            position: 'absolute',
            top: '12%',
            left: '13%',
            right: '13%',
            bottom: '12%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '2%',
            outline: 'none',
            padding: '2%'
        }
    }
    
    useEffect(() => {
        const link1 = "http://34.64.95.170:8080/items/" + props.idx
        axios.get(link1)
        .then(function(responseHandler){
            const tmp = responseHandler.data
            console.log(tmp)
            settitle(tmp.title)
            setitem(tmp)
        })
    }, [props.idx])

    return <div style={boardstyle}>
        <div>
            <div style={tmpstyle}>
                {(titles != "x") && <Bookimage asin={items.asin}/>}
                {(titles != "x") && <Booktitle title={titles}/>}    
            </div>
            
        </div>
    </div>
}

export default Bookcover