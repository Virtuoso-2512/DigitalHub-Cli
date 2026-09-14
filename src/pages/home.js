import { GlobalState } from "../GlobalParent";
import { useEffect, useState } from "react";
import HomeExplore from "../components/HomeExplore";
import Theme from "../components/theme";
import Footer from "../components/footer";

export default function Home() {
    const {username,SERVER, get, userLevel, InstituteName} = GlobalState(), [explore, setExplore] = useState([]), [waAlive, setWAAlive] = useState(true);
    const names = [InstituteName, username, "" , "", username];

    useEffect(() => {
      async function exploreReq(){
        const exploreOp = await get("explore");
        setExplore(exploreOp.options || []);
      }
      async function waStat(){
        if(userLevel === -1) {
            const waStatus = await get((typeof userLevel === "number" ? "" : "sa/") + "wa/status");
            setWAAlive(waStatus.WaStatus ? true : false);
        }
      }
      exploreReq()
      waStat();
      setInterval(waStat(), 60000);
    }, [])

    const greet = () => {
        const hours = new Date().getHours();

        if(hours >= 3 && hours < 12) return "Morning";
        if(hours >= 12 && hours < 18) return "Afternoon";
        else return "Evening";
    };

    return <><div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content",minHeight:"73vh",padding:"0 4vw",background:"var(--background)"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%", maxHeight:"25vh"}}>
            <img src={SERVER+"assets/greet/"+greet()+".svg"} className="faihome"/>
            <div>
                <h1 className="loader" style={{color:"var(--color)",fontFamily:"Poppins",letterSpacing:"1px",fontWeight:"600",fontSize:"42px",lineHeight:".4"}}>Good {greet()}, {names[userLevel+1]}</h1>
                <h3 className={"loader home-"+greet()} style={{padding:"0 .5vw"}}>Welcome to {`{{Product_Name}}`} !</h3>
            </div>
        </div>
        <HomeExplore explore={explore}/>
        {userLevel === 3 && <Theme/>}
        {userLevel === -1 && <>
            <h3 style={{marginTop:"10vh",fontFamily:"Poppins"}}>WhatsApp Bot Check: WhatsApp Service is <span style={{color:waAlive?"green":"red"}}>{waAlive ? "Working" : "Unavailable"}</span> at the moment !</h3>
            <p style={{marginTop:"1vh"}}>This Service periodically checks for WhatsApp Bot Status !</p>
        </>}
    </div><Footer/></>
}