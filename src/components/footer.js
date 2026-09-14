import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalParent";

export default function Footer(){
    const {pathname} = GlobalState();
    const style = {margin:"0 8px",padding:"5px",fontSize:"12px",cursor:"default",textDecoration:"none",color:"var(--color)"}; 
  
  return <footer className="pfooter" style={{height:"45px",display:"flex",alignItems:"center",justifyContent:"start",bottom:0,marginTop:pathname==="/login" ?"-55px":0,width:"99.5%",opacity: pathname==="/login"?"80%":"100%"}}>
        <h5 style={{marginRight:"auto"}}>&copy; 2023-{new Date().getFullYear()} Arnav Thakare. All rights reserved</h5>
        
        <Link style={style} to="/tos">Terms</Link>
        |
        <Link style={style} to="/privacy">Privacy Policy</Link>
    </footer>
}