import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import Modal from "react-modal/lib/components/Modal";
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Calendar from "./Calendar";
import TCalendar from './TCalendar'
import Ranklist from "./Ranklist";
import axios from "axios";
import store4 from "./store4";

function Booksearch(props){

    const [rendering, rerendering] = useState(1)
    useEffect(() => {
        rerendering(Math.random())
    })

    store4.subscribe(function () {
        if (store4.getState().id === 0) {
            setstart(store4.getState().date);
        }
        else if (store4.getState().id === 1) {
            setend(store4.getState().date);
        }
    }.bind(this))

    const ID = useSelector( (state) => state)

    const [startdate, setstart] = useState(0)
    const [enddate, setend] = useState(0)

    const [isOpen, setOpen] = useState(false)
    const [modalopen, setmodal] = useState(false)
    const [ispred, setpred] = useState(false)
    const [rates, setrate] = useState([{idx:0, rate:[false, false, false, false, false], num:-1}])
    const [tempreview, settemp] = useState("")
    const [datalength, setlength] = useState(0)
    const [keyword, setkeyword] = useState("")

    const [prevlist, setprev] = useState([])

    const [tmplist, settemplist] = useState([])

    const not_login = [{"idx" : 1, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 2, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 3, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 4, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 5, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 6, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 7, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 8, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 9, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 10, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""}]

    const [data, setdata] = useState([{"idx" : 1, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 2, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 3, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 4, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 5, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 6, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 7, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 8, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 9, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 10, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""}])

    const reviewmodalstyle = {
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
            width: '500px',
            height: '630px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '2%',
            outline: 'none',
            padding: '2%',
            flexDirection:"row",
        }
    }

    const predstyle = {
        width: '250px',
        height: '50px',
        flexDirection: 'row',
        display: 'flex',
        margin: "auto",
    }

    const buttonstyle2 = {
        width: "80px",
        height: "40px",
        border: "1px solid black",
        margin: "20px"
    }

    function setstar(r){
        let temp = []
        for (let ii = 0; ii<r; ii++){
            temp.push(true)
        } 
        for (let ii = 0; ii<(5 - r); ii++){
            temp.push(false)
        }
        setrate([{idx:0, rate:temp, num:r}])
    }

    const additem = (title, asin) => {
        
        const link = "http://34.64.95.170:8080/intersave"
        let items = {id:ID.ID, title:title, asin:asin, rate:rates[0].num, review:tempreview, startdate:getFormatDate(startdate), enddate:getFormatDate(enddate)}
        axios.post(link, items)
        .then(function(responseHandler){
            if (datalength <= 10) {
                setdata(data.map(d =>
                    d.idx === datalength + 1 ? {"idx" : datalength, "Title":title, "rate": items.rate, "review": items.review, "Date1":items.startdate, "Date2":items.enddate, "asin":asin} : d)
                );
            }
            else{
                setdata([...data, {"idx" : datalength, "Title":title, "rate": items.rate, "review": items.review, "Date1":items.startdate, "Date2":items.enddate, "asin":asin}])
            }
            setlength(datalength + 1)
        })
        /*
        setdata(data.map(d =>
            d.idx === 4 ? {"idx" : 4, "Title":title, "rate": rates[0].num, "review": tempreview, "Date1":getFormatDate(startdate), "Date2":getFormatDate(enddate), "asin":asin} : d)
        );*/
    }

    const onContentChange = (event) => {
        settemp(event.currentTarget.value)
    };
    const onkeywordChange = (event) => {
        setkeyword(event.currentTarget.value)
    };

    useEffect(() => {
        if (ID.login == "logout"){
            /*setdata(not_login)*/
            const link = "http://34.64.95.170:8080/userdata/" + ID.ID
            axios.get(link)
            .then(function(responseHandler) {
                console.log(responseHandler.data)
                const d = responseHandler.data
                let temp = []
                for (let i = 0; i < d.length; i++){
                    temp.push({"idx" : i + 1, "Title":d[i].title, "rate": d[i].overall, "review": d[i].reviewText, "Date1":d[i].startdate, "Date2":d[i].enddate, "asin":d[i].asin})
                }
                setlength(d.length)
                if (d.length < 10){
                    for (let i = 0; i < 10 - d.length; i++){
                        temp.push({"idx" : i + 1 + d.length, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""})
                    }
                }
                setdata(temp)
            })
        }
        
    }, [ID.login])
    
    const getItems = () => {        
        const link1 = "http://34.64.95.170:8080/itemsli/" + keyword
        axios.get(link1)
        .then(function(responseHandler){
            const tmp = responseHandler.data
        /*
        const tmp = [{"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['<strong>Product Description</strong><br /> Immerse yourself in the world of the spectacular <i>Harry Potter</i> film series. Learn why Yule Ball ice sculptures never melt, where Galleons, Sickles, and Knuts are really \"minted,\" how to get a Hippogriff to work with actors, the inspiration behind Hogwarts castle, and why Dementors move the way they do. Written and designed in collaboration with the cast and crew that brought J. K. Rowling\\'s celebrated novels to the silver screen, <i>Harry Potter: Film Wizardry</i> delivers an enchanting interactive experience, transporting readers to the wizarding world by sharing filmmaking secrets, unpublished photography and artwork, and exclusive stories from the stars. Full of removable facsimile reproductions of props and paper ephemera from the movies, this collectible volume offers a privileged look at the <i>Harry Potter</i> films and the talented group of Muggles that has made true movie magic. <br />', '', '', '', '', 'Immerse yourself in the world of the spectacular <em>Harry Potter</em> film series, and learn why Yule Ball ice sculptures never melt, where Galleons, Sickles, and Knuts are really \"minted,\" how to get a Hippogriff to work with actors, the inspiration behind Hogwarts castle, and why Dementors move the way they do. Written and designed in collation with the cast and crew that brought J. K. Rowling\\'s celebrated novels to the silver screen, <em>Harry Potter: Film Wizardry</em> delivers an enchanting interactive experience, transporting readers to the wizarding world by sharing film-making secrets, unpublished photography and artwork, and exclusive stories from the stars. Full of removable facsimile reproductions of props and paper ephemera from the movies, this collectible volume offers a privileged look at the <em>Harry Potter</em> films and the talented group of Muggles that has made true movie magic.', '', '', '']","title":"Harry Potter Film Wizardry","price":"$47.89","asin":"0061997811","imgurl":"https://bookthumb-phinf.pstatic.net/cover/063/897/06389793.jpg?type=m1&udate=20120904"},
        {"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['', '', '', '', '<em>Harry Potter: Page to Screen</em> opens the doors to Hogwarts castle and the wizarding world of Harry Potter to reveal the complete behind-the-scenes secrets, techniques, and over-the-top artistry that brought J.K. Rowlings acclaimed novels to cinematic life. Developed in collaboration with the creative team behind the celebrated movie series, this deluxe, 500-plus page compendium features exclusive stories from the cast and crew, hundreds of never-before-seen photographs and concept illustrations sourced from the closed film sets, and rare memorabilia. As the definitive look at the magic that made cinematic history, <em>Page to Screen</em> is the ultimate collectible, perfect for Muggles everywhere.', '', '', '']","title":"Harry Potter Page to Screen: The Complete Filmmaking Journey","asin":"0062101897","imgurl":"https://bookthumb-phinf.pstatic.net/cover/067/598/06759869.jpg?type=m1&udate=20161122"},
        {"category":"['Books', 'Humor & Entertainment', 'Movies']","description":"['&#8220;It&#8217;s the kind of trivia only a true fan would know, and since it comes packaged in beautiful purple binding, it&#8217;s sure to make other muggles quake with envy.&#8221; (MoviePilot.com)<br /><br />&#8220;If you are a fan of the films, and are looking for more details, insider information, and sketches galore, then this is the book for you and...a must have.&#8221; (Mugglenet.com)<br /><br />&#8220;...it&#8217;s fun to see the way various creatures evolved before the final image.&#8221; (Geekdad.com)<br /><br />&#8220;...this coffee-table tome is a comprehensive and delightful look at the memorable creatures that populate the magical world... A true collector&#8217;s edition...&#8221; (Examiner.com)<br /><br />&#8220;...Revenson is one of the few&#8212;outside of perhaps Rowling herself&#8212;who is paid to know every twist, turn, first appearance, second appearance, elbow shape and snout color for every beast that has ever appeared in the Harry Potter movie series.&#8221; fuzzy and awesome.&#8221; (Hello Giggles)', '', \"Jody Revenson has written extensively about the Harry Potter films, with her most recent books being <em>J.K. Rowling's Wizarding World: Movie Magic: Volume One</em> and <em>Harry Potter: The Artifact Vault</em>. In her first foray into the wizarding world, she edited and contributed to the <em>New York Times</em> bestsellers <em>Harry Potter: Film Wizardry</em> and <em>Harry Potter: Page to Screen</em>.\"]","title":"Harry Potter: The Creature Vault: The Creatures and Plants of the Harry Potter Films","price":"$19.04","asin":"0062374230","imgurl":"https://bookthumb-phinf.pstatic.net/cover/083/168/08316890.jpg?type=m1&udate=20161117"},
        {"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['These rare Harry Potter images show you Hogwarts like youve never seen it before. (MTV News)<br /><br />...you need to add to your collection immediately. (Hello Giggles)<br /><br />Will show you details about the Harry Potter movie sets you never noticed before (Bustle)', '', \"Jody Revenson has written extensively about the Harry Potter films, with her most recent books being <em>J.K. Rowling's Wizarding World: Movie Magic: Volume One</em> and <em>Harry Potter: The Artifact Vault</em>. In her first foray into the wizarding world, she edited and contributed to the <em>New York Times</em> bestsellers <em>Harry Potter: Film Wizardry</em> and <em>Harry Potter: Page to Screen</em>.\", '', '', '']","title":"Harry Potter: Magical Places from the Films: Hogwarts, Diagon Alley, and Beyond","price":"$30.59","asin":"0062385658","imgurl":"https://bookthumb-phinf.pstatic.net/cover/090/415/09041537.jpg?type=m1&udate=20161206"},{"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['', \"Jody Revenson has written extensively about the Harry Potter films, with her most recent books being <em>J.K. Rowling's Wizarding World: Movie Magic: Volume One</em> and <em>Harry Potter: The Artifact Vault</em>. In her first foray into the wizarding world, she edited and contributed to the <em>New York Times</em> bestsellers <em>Harry Potter: Film Wizardry</em> and <em>Harry Potter: Page to Screen</em>.\", '', '', '']","title":"Harry Potter: The Character Vault","price":"$24.53","asin":"0062407449","imgurl":"https://bookthumb-phinf.pstatic.net/cover/097/077/09707727.jpg?type=m1&udate=20191119"},
        {"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['', \"Jody Revenson has written extensively about the Harry Potter films, with her most recent books being <em>J.K. Rowling's Wizarding World: Movie Magic: Volume One</em> and <em>Harry Potter: The Artifact Vault</em>. In her first foray into the wizarding world, she edited and contributed to the <em>New York Times</em> bestsellers <em>Harry Potter: Film Wizardry</em> and <em>Harry Potter: Page to Screen</em>.\", '', '', '']","title":"Harry Potter: The Artifact Vault","price":"$24.75","asin":"0062474219","imgurl":"https://bookthumb-phinf.pstatic.net/cover/107/107/10710788.jpg?type=m1&udate=20191119"},{"category":"['Books', 'Humor &amp; Entertainment', 'Movies']","description":"['', '']","title":"Harry Potter and the Chamber of Secrets Enchanted Postcard Book","price":"$9.08","asin":"0062821644","imgurl":"https://bookthumb-phinf.pstatic.net/cover/122/702/12270291.jpg?type=m1&udate=20170810"},
        {"category":"['Books', 'Humor & Entertainment', 'Movies']","title":"Harry Potter and the Sorcerer's Stone Enchanted Postcard Book","price":"$3.25","asin":"0062821636","imgurl":"https://bookthumb-phinf.pstatic.net/cover/122/702/12270292.jpg?type=m1&udate=20170810"},
        {"category":"['Books', 'Literature & Fiction', 'History & Criticism']","description":"['A perceptive critic, Lurie (Don\\'t Tell the Grown-Ups) has long been a close observer of children\\'s literature. This welcome volume collects a number of her essays on the subject, most of which appeared in other versions in the New York Review of Books. As she wittily deconstructs the lives and works of authors as varied as Louisa May Alcott (\"she was the daughter of what would now be described as vegetarian hippie intellectuals, with fringe religious and social beliefs, and spent nearly a year of her childhood in an unsuccessful commune\"), Hans Christian Andersen, J.K. Rowling and Dr. Seuss, a common theme emerges, including such topics as gender role reversal and social satire in the Oz books","price":"$14.90","asin":"0142002526","imgurl":"https://bookthumb-phinf.pstatic.net/cover/003/225/00322552.jpg?type=m1&udate=20100111"},
        {"category":"['Books', 'Literature &amp; Fiction', 'History &amp; Criticism']","description":"[\"Animated by Highfield's enthusiasm for the extraordinary, <i>The Science of Harry Potter</i> is an enjoyably indirect survey of modern science.<br /><i><b>The New York Times Book Review</b></i><br /><br />Far-ranging . . . Enlightens Harry Potter's magical realm, but also the magic taking place in labs and classrooms in our own world.<br /><b><i>Science News</i></b><br /><br />He has interviewed the world's best Muggle scientists to identify the explanations behind everything from the Mirror of Erised to the Invisibility Cloak . . . A great introduction to a whole variety of issues.<br /><b>Simon Singh, </b><i><b>The Observer</b></i><br /><br />A wonderful hook for a wonderful book . . . as one reads <i>The Science of Harry Potter</i> it is impossible not to become intrigued.<br /><b>Orlando Sentinel</b>\", 'Roger Highfield was born in Wales, raised in north London and became the first person to bounce a neutron off a soap bubble. He was the science editor of <i>The Daily Telegraph</i> for two decades and the editor of <i>New Scientist</i> between 2008 and 2011. Today, he is the Director of External Affairs at the Science Museum Group.A regular broadcaster on the BBC and the winner of several journalism awards, Highfield is the author of <i><b>The Physics of Christmas</b></i> and coauthor of such highly acclaimed books as <i><b>The Arrow of Time</b></i> and <i><b>The Private Lives of Albert Einstein</b></i>.', '', '']","title":"The Science of Harry Potter: How Magic Really Works","price":"$13.91","asin":"0142003557","imgurl":"https://bookthumb-phinf.pstatic.net/cover/003/226/00322648.jpg?type=m1&udate=20091228"}]
        */
            for (let i = 0; i<tmp.length; i++){
                try{
                    tmp[i].category = tmp[i].category.replace("[", "")
                } catch {}
                try{
                    tmp[i].category = tmp[i].category.replace("]", "")
                } catch {}
                try{
                    tmp[i].category = tmp[i].category.replace(" ", "")
                } catch {}
                try{
                    tmp[i].category = tmp[i].category.replace("'", "")
                } catch {}
                
                try{
                    tmp[i].description = tmp[i].description.replace("[", "")
                } catch {}
                try{
                    tmp[i].description = tmp[i].description.replace("]", "")
                } catch {}
                try{
                    tmp[i].description = tmp[i].description.replace('"', "")
                } catch {}
                try{
                    tmp[i].description = tmp[i].description.replace("'", "")
                } catch {}
                try{
                    tmp[i].description = tmp[i].description.replace(",", "")
                }
                catch {}
            }
            settemplist((tmplist) => tmp)
            setOpen(true)
        })
    }

    function getFormatDate(date){
        if (date == 0){ return "" }
        else{
            var year = date.getFullYear();              
            var month = (1 + date.getMonth());          
            month = month >= 10 ? month : '0' + month;  
            var day = date.getDate();                  
            day = day >= 10 ? day : '0' + day;          
            return  year + ' - ' + month + ' - ' + day;      
        }
    }

    function open(){
        setstart(0)
        setend(0)
        setrate([{idx:0, rate:[false, false, false, false, false], num:-1}])
        settemp("")
        setmodal(true)
    }

    function onprev(){
        const link1 = "http://34.64.95.170:8080/inference/" + ID.ID
        axios.get(link1)
        .then(function(responseHandler){
            const tmp = responseHandler.data
            setprev(tmp)
            setpred(true)
        })
    }

    const result = tmplist.map((items) => {
        return <div style={{margin:"20px", border:"1px solid black", height:"300px", display:"flex", width:"96.5%"}}>
            <img src={items.imgurl} style={{display:"flex", width:"220px", height:"280px", margin:"10px"}}/>
            <div style={{display:"flex", margin:"20px"}}>
                <div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%", height:"50px"}}><h3 style={{textAlign:"center"}}>title : </h3></div>
                        <div style={{width:"77%", height:"50px"}}><p>{items.title}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%", height:"40px"}}><h3 style={{textAlign:"center"}}>category : </h3></div>
                        <div style={{width:"77%", height:"40px"}}><p>{(items.category)}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%", height:"100px"}}><h3 style={{textAlign:"center"}}>description : </h3></div>
                        <div style={{width:"77%", height:"100px", overflow:"auto"}}><p dangerouslySetInnerHTML={ {__html: items.description} }></p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%", height:"40px"}}><h3 style={{textAlign:"center"}}>price : </h3></div>
                        <div style={{width:"77%", height:"40px"}}><p>{items.price}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%", height:"40px"}}><h3 style={{textAlign:"center"}}>asin : </h3></div>
                        <div style={{width:"77%", height:"40px"}}><p>{items.asin}</p></div>
                    </div>
                </div>
            
            <button style={{width:"60px", height:"20px"}} onClick={() => open()}>+</button>
            </div>
            <Modal style={reviewmodalstyle} isOpen={modalopen}>
                <button style={{float:"right"}} onClick={()=> setmodal(false)}>X</button>
                <h2 style={{textAlign:"center"}}>{items.title}</h2>
                <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                    {rates[0].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1)}}/>}
                    {rates[0].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1)}}/>}
                    {rates[0].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2)}}/>}
                    {rates[0].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2)}}/>}
                    {rates[0].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3)}}/>}
                    {rates[0].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3)}}/>}
                    {rates[0].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4)}}/>}
                    {rates[0].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4)}}/>}
                    {rates[0].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5)}}/>}
                    {rates[0].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5)}}/>}
                </div>
                <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                <Calendar/>
                <div style={predstyle}>
                    <div style={buttonstyle2} onClick={() => {additem(items.title, items.asin); setmodal(false)}}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                    <div style={buttonstyle2} onClick={() => setmodal(false)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                </div>
            </Modal>
        </div> 
    })

    return<div>

        <div style={{display:"flex", margin:"20px"}}>
            <input style={{height:"20px", width:"400px", fontSize:"15pt", padding:"10px"}} type="text" value={keyword} onChange={onkeywordChange}/>
            <button onClick={() => {getItems();}} style={{width:"60px", height:"40px", textAlign:"center", margin:"3px"}}><p>search</p></button>
            <button onClick={() => {onprev()}} style={{width:"80px", height:"40px", textAlign:"center", margin:"3px"}}><p>추천받기</p></button>
        </div>
        {(ispred) && <Ranklist li={prevlist}/>}
        {(isOpen) && <div style={{width:"100%", height:"700px", margin:"15px",border:"1px solid black", overflow:"auto", flexDirection:"columns"}}>
            {result}
            
        </div>}
        <hr style={{width:"100%", marginBottom:"2%"}}/>
        <div style={{flexDirection:"row", display:"flex"}}>  
            <div style={{display:"flex", width:"100%"}}>
                <Table id={ID.ID} data={data}/>
            </div>
            <div style={{display:"flex", margin:"auto"}}>
                
            </div>
        </div>
    </div>
}

export default Booksearch