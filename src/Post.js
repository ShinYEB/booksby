import axios from "axios";
import React, {useState, useEffect} from "react";

function Post(props){
    alert(props)
    const [item, setitem] = useState([])
    const [k, re] = useState(0)

    function content(props){
        alert(props)
        const link = "http://34.64.95.170:8080/test1"
        axios.get(link)
        .then(function(responseHandler) {
            setitem((item) => responseHandler.data);
        })
    }
    
    useEffect(() => {
        content()
    }, [])

    return item
}

export default Post