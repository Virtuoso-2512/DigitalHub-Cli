import { GlobalState } from "../../GlobalParent";
import { useEffect, useState } from "react";
import Switch from "../../components/switch";
import HomeExplore from "../../components/HomeExplore";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";

export default function Home() {
    const {username,SERVER, get} = GlobalState(), [explore, setExplore] = useState([]), [announcement, showAnnouncement] = useState(false);

    useEffect(() => {
      async function exploreReq(){
        const exploreOp = await get("explore");
        setExplore(exploreOp.options || []);
      }
      exploreReq()
    }, [])

    const greet = () => {
        const hours = new Date().getHours();

        if(hours >= 3 && hours < 12) return "Morning";
        if(hours >= 12 && hours < 18) return "Afternoon";
        else return "Evening";
    };

    return <><div style={{display:"flex",flexDirection:"column",width:"100%",padding:"2vw 4vw"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
            <img src={SERVER+"assets/greet/"+greet()+".svg"} className="faihome"/>
            <div>
                <h1 className="loader" style={{color:"var(--color)",fontFamily:"Roboto",letterSpacing:"1px",fontWeight:"600",fontSize:"42px",lineHeight:".4"}}>Good {greet()}</h1>
                <h3 className={"loader home-"+greet()} style={{padding:"0 .5vw"}}>Welcome to {`{{Product_Name}}`}, {username} !</h3>
            </div>
        </div>
        <div id="profileHeader" style={{display:"flex",flexDirection:"row",alignItems:"center",width:"95vw"}}>
            <h3 style={{color:announcement?"#888":"#1972d6",margin:"10px",fontFamily:"Poppins", cursor:"pointer"}} onClick={()=>showAnnouncement(false)}>Explore</h3>
            <h3 style={{color:"#888",fontFamily:"Poppins"}}>|</h3>
            <h3 style={{color:announcement?"#1972d6":"#888",margin:"10px",fontFamily:"Poppins", cursor:"pointer"}} onClick={()=>showAnnouncement(true)}>Announcements</h3>
            <div style={{width:"100%"}}/>
            <Link to="/profile" className="rhs" style={{textDecoration:"none",display:"flex", flexDirection:"row",alignItems:"center"}}>
                <i className="fas fa-user" style={{fontSize:"24px",marginLeft:"5px"}}/>
                <h3 style={{margin:"10px",fontFamily:"Poppins", cursor:"pointer"}} onClick={()=>showAnnouncement(true)}>Profile</h3>
            </Link>
            <h3 style={{color:"#888",fontFamily:"Poppins"}}>|</h3>
            <Link to="/profile" style={{textDecoration:"none"}}><h3 style={{color:announcement?"#1972d6":"#888",margin:"10px",fontFamily:"Poppins", cursor:"pointer"}} onClick={()=>showAnnouncement(true)}>Announcements</h3></Link>
            <h3 style={{color:"#888",fontFamily:"Poppins"}}>|</h3>
            <Link to="/profile" style={{textDecoration:"none"}}><h3 style={{color:announcement?"#1972d6":"#888",margin:"10px",fontFamily:"Poppins", cursor:"pointer"}} onClick={()=>showAnnouncement(true)}>Announcements</h3></Link>

        </div>
        {announcement ? <Announcement/> : <HomeExplore explore={explore}/>}
    </div><Footer/></>
}

function Announcement(){
    return <div>

    </div>
}