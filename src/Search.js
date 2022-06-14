import React, {useState, useEffect} from "react";
import axios from "axios";

function Search(props){

    const [item, setitem] = useState([])

    function content(item){
        const link = "http://34.64.95.170:8080/search/" + item 
        axios.get(link)
        .then(function(responseHandler) {
            console.log(responseHandler)
            setitem(responseHandler.data);
        })
    }

    useEffect(() => {
        content(props)
    }, [])

    return item
}

export default Search