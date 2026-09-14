import { GlobalState } from "../../GlobalParent";
import { useEffect, useState } from "react";
import HomeExplore from "../../components/HomeExplore";
import Footer from "../../components/footer";

export default function Home() {
    const {InstituteName,SERVER, get} = GlobalState(), [explore, setExplore] = useState([]);

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

    return <><div style={{display:"flex",flexDirection:"column",width:"100%",height:"fit-content",minHeight:"73vh",padding:"2vw 4vw",background:"var(--background)"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
            <img src={SERVER+"assets/greet/"+greet()+".svg"} className="faihome"/>
            <div>
                <h1 className="loader" style={{color:"var(--color)",fontFamily:"Roboto",letterSpacing:"1px",fontWeight:"600",fontSize:"42px",lineHeight:".4"}}>Good {greet()}</h1>
                <h3 className={"loader home-"+greet()} style={{padding:"0 .5vw"}}>Welcome to {`{{Product_Name}}`}, {InstituteName} Admin !</h3>
            </div>
        </div>
        <HomeExplore explore={explore}/>    </div><Footer/></>
}