import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalParent";
import Button from "../../components/button";
import Classwork from "../../classroom/bulletinGet";
import People from "../../classroom/people";

const style = {fontFamily:"Poppins",
webkitBackgroundClip: "text",
webkitTextFillColor: "transparent"};

export default function ClassStu(props) {
  const {get,setTitle, role} = GlobalState(), [div, setDiv] = useState({name:"___"}),[eligible, setEligible] = useState(false), [active, setActive] = useState(-1);

  useEffect(async() => {
    const hiii = await get("division/info/"+props.match.params.id);
    setDiv(hiii);
    setTitle(hiii.batch.name + " " + hiii.name + " Classroom");

    if(role === 1 || role === 3){ //Vice Principal and Class Teacher
      const hoiii = await get("division/eligible/"+props.match.params.id+"?role="+role);
      setEligible(hoiii.eli);
    }
  }, []);

  const options = ["Class Work", "People", "Evaluation", "Attendance"], compo = [<Classwork div={div?._id}/>, <People div={div?._id}/>]

  return <div style={{width:"95vw",margin:"0 auto", display:"flex",flexDirection:"column",justifyContent:"center", flexWrap:"wrap"}} >
    {div.name === "___" ? <h1 style={{fontFamily:"Poppins"}}>Fetching Your Class
      <div class="jumping-dot-container">
        <span class="jumping-dot dot-1"></span>
        <span class="jumping-dot dot-2"></span>
        <span class="jumping-dot dot-3"></span>
      </div>
    </h1> : <>

    <div style={{ display:"flex",width:"95vw",flexDirection:"row",minHeight:"5vh"}}>
      <h1 style={{...style,width:"75vw", margin:"auto auto auto 0",fontSize:"32px"}} className={"theme-"+(div.theme+1)}>{div.batch.name} {div.name}</h1>

      {eligible ? <div style={{display:"flex",flexDirection:"row",height:"7vh",margin:"auto",borderRadius:"18px",padding:"0"}}>
        <Button variant={6} onClick={()=>setActive(5)} style={{margin:"0 20px 0 0", fontSize:16, background:active === 5 ? "var(--gradient)" : ""}}><span style={style} className={"theme-"+(div.theme+1)}>Evaluation</span></Button>
        <Button variant={6} onClick={()=>setActive(6)} style={{margin:"0 20px 0 0", fontSize:16, background:active === 6 ? "var(--gradient)" : ""}}><span style={style} className={"theme-"+(div.theme+1)}>Attendance</span></Button>
      </div> : null}
      
      {options.map((option,idx) => <Button variant={6} onClick={()=>setActive(idx)} style={{margin:"0 20px 0 0", fontSize:16, background:active === idx ? "var(--background)" : ""}}><span style={style} className={"theme-"+(div.theme+1)}>{option}</span></Button>)}
      
    </div>
    
    <div style={{display:"flex",flexDirection:"column",height:"fit-content",minHeight:"60vh",minWidth:"94.99vw",maxWidth:"95vw",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
      {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
    </div>
  </> }
  </div>
}