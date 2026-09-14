import { useEffect, useState } from 'react';
import toast from "../controllers/Alert.js";
import { GlobalState } from '../GlobalParent.js';
import { Redirect } from "react-router-dom";
import Button from '../components/button.js';
import Input from '../components/input.js';
import "./login.css";

export default function Reset(props) {
  const [show, setShow] = useState(true), [new1, setNew1] = useState(""), [new2, setNew2] = useState("")
  const {token} = props.match.params, {post, setNavbar} = GlobalState(), [reset, setReset] = useState("");

  useEffect(() => setNavbar(true), [])
  
  const ChangePwd = async() => {
    const res = await post("auth/reset_password/", {new1,token});
    
    if(res.success) {toast("Password Changed !", 1); return setReset(true);}
    return toast("Error in Password Reset !");
  }, check = (lvl) =>{
      const lvlss = [
        new1.trim().length >= 8 ? true : false,
        /[a-z]/.test(new1) && /[A-Z]/.test(new1) && /[0-9]/.test(new1),
        /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(new1)
      ]

      if(lvl === -1) return lvlss[0] && lvlss[1] && lvlss[2] && new1 === new2 && new1.length <= 25;
      
      return lvlss[lvl];
  };

  return <div style={{ width: "100vw", display: "flex", flexDirection: "column", height: "75vh", color:"var(--color)", justifyContent:"center",alignItems:"center" }}>
    <h1>Reset Your Password</h1>
    
    <Input type={show ? "password" : "text"} value={new1} onChange={setNew1} label="New Password"/>
    <Input type={show ? "password" : "text"} value={new2} onChange={setNew2} label="Re-Enter New Password"/>
    <Button variant={6} onClick={()=>setShow(!show)}>{show ? "Show" : "Hide"} Password</Button>

    <p style={{fontFamily:"Roboto"}}>Your Password must be atleast
        <span style={{color:check(0) ? "#65a765" : "#D30000"}}> 8 characters, </span>
        include
        <span style={{color:check(1) ? "#65a765" : "#D30000"}}> a number, an uppercase letter, a lowercase letter </span>
        and 
        <span style={{ color:check(2) ? "#65a765" : "#D30000"}}> a special character. </span></p>
    <Button variant={1} onClick={()=>check(-1) ? ChangePwd() : ()=>{}} disabled={!check(-1)}> <i className="fa-solid fa-pass"/> Reset Password</Button>
    {reset ? <Redirect to={"/login?password="+new1}/> : <div/>}
</div>;
}