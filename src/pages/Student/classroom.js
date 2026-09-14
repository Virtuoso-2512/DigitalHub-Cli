import {useEffect, useMemo, useState} from "react";
import { Link, useLocation} from "react-router-dom";
import { GlobalState } from "../../GlobalParent";
import Button from "../../components/button";
import Classwork from "../../classroom/bulletinGet";
import People from "../../classroom/people";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const style = {fontFamily:"Poppins",
webkitBackgroundClip: "text",
webkitTextFillColor: "transparent"};

export default function ClassStu() {
  const {get,setTitle} = GlobalState(), query = useQuery();
  const [div, setDiv] = useState({name:"___"}), [active, setActive] = useState((parseInt(query.get("a"))-1));

  useEffect(async() => {
    const hiii = await get("division");
    setDiv(hiii);
    setTitle(hiii.batch.name + " " + hiii.name + " Classroom");
  }, []);
  
  const options = ["Attendance", "Class Work", "People"], compo = [<div/>, <Classwork div={div?._id}/>, <People div={div?._id}/>];

  return <div style={{width:"95vw",margin:"0 auto", display:"flex",flexDirection:"column",justifyContent:"center", flexWrap:"wrap"}} >
    {div.name === "___" ? <h1 style={{fontFamily:"Poppins"}}>Fetching Your Class
      <div class="jumping-dot-container">
        <span class="jumping-dot dot-1"></span>
        <span class="jumping-dot dot-2"></span>
        <span class="jumping-dot dot-3"></span>
      </div>
    </h1> : (div.name ? <>

    <div style={{ display:"flex",width:"95vw",flexDirection:"row",minHeight:"5vh"}}>
      <h1 style={{...style,width:"75vw", margin:"auto auto auto 0",fontSize:"32px"}} className={"theme-"+(div.theme+1)}>{div.batch.name} {div.name}</h1>

      <Link to={"/vc/" + div._id} title="Join Class" style={{textDecoration:"none"}}>
      <Button variant={6} style={{fontSize:"20px"}}><i className="fas fa-headphones"/></Button>
      </Link><Link>
      <Button variant={6} style={{fontSize:"20px"}}><i className="fas fa-sticky-note"/></Button>
      </Link>

      <div style={{display:"flex",justifyContent:"space-between",borderRadius:"18px",padding:"0 10vw",background:"var(--gradient)"}}>
      {options.map((option,idx) => <Button variant={6} onClick={()=>setActive(idx)} style={{margin:idx === 0 ? "0 20px 0 0" : (idx+1 === options.length ? "0 0 0 20px" : "0 20px"), fontSize:16, background:active === idx ? "var(--background)" : ""}}><span style={style} className={"theme-"+(div.theme+1)}>{option}</span></Button>)}
      </div>
    </div>
    
    <div style={{display:"flex",flexDirection:"column",height:"fit-content",minHeight:"60vh",minWidth:"94.99vw",maxWidth:"95vw",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
      {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
    </div>
  </> : <h1 style={{fontFamily:"Poppins"}}>You don't have access to any Classroom !</h1>)}
  </div>
}