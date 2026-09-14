import { useState } from "react";
import Swal from "sweetalert2";
import  toast from "../controllers/Alert";
import { GlobalState } from '../GlobalParent';
import Input from "../components/input";
import Switch from "../components/switch";
import Button from "../components/button";

export default function Password(){
  const { post,userLevel } = GlobalState(), [old, setOld] = useState(""), [new1, setNew1] = useState(""), [new2, setNew2] = useState(""), [show, setShow] = useState(true);
  const [logout, setLogout] = useState(false);

  const ChangePwd = async() => {
    const res = await post("auth/change?logout="+(logout ? "1" : ""), {old,new1,userLevel});
    if(res.success) return toast("Account Password Changed !", 1);
    return toast("Error in Password Change !");

  }, check = (lvl) =>{
    const lvlss = [
      new1.trim().length >= 8 ? true : false,
      /[a-z]/.test(new1) && /[A-Z]/.test(new1) && /[0-9]/.test(new1),
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(new1)
    ]

    if(lvl === -1) return lvlss[0] && lvlss[1] && lvlss[2] && new1 === new2 && old && new1.length <= 25 && new1 !== old
      
    return lvlss[lvl];
  }, ChangingFirst = () => Swal.fire({
    title:"Changing Password for the first time",
    text:"To Change Your Password for the first time, Logout from here. Then, go to Login Page and Click on 'Forgot Password'. You will receive a mail regarding password reset.",
    confirmButtonColor:"#1972d6",
    confirmButtonText:"Yes, Got it !"
  });

  return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",margin:"0 10px"}}>
    <h2 style={{textAlign:"center",fontFamily:"Roboto"}}>Change Your Password</h2>
        <Input type={show ? "password" : "text"} value={old} onChange={setOld} label="Current Password"/>
        <Input type={show ? "password" : "text"} value={new1} onChange={setNew1} label="New Password"/>
        <Input type={show ? "password" : "text"} value={new2} onChange={setNew2} label="Re-Enter New Password"/>
        <div>
          <Button variant={4} onClick={()=>setShow(!show)}>{show ? "Show" : "Hide"} Password</Button>
          <Button variant={5} onClick={ChangingFirst}> Changing Password for the first time</Button>  
        </div>
      <p style={{fontFamily:"Roboto"}}>Your Password must be atleast
        <span style={{color:check(0) ? "#65a765" : "#D30000"}}> 8 characters, </span>
        include
        <span style={{color:check(1) ? "#65a765" : "#D30000"}}> a number, an uppercase letter, a lowercase letter </span>
        and 
        <span style={{ color:check(2) ? "#65a765" : "#D30000"}}> a special character. </span></p>
    <div style={{display:"flex",justifyContent:"start",alignItems:"center",width:"35vw",marginTop:"8vh"}}>
      <h4 style={{margin:"5px 15px"}}>Do you want to logout of all active devices, except this one ?</h4>
      <Switch state={logout} onChange={setLogout}/>
    </div>
    <Button variant={1} onClick={()=>check(-1) ? ChangePwd() : ()=>{}} disabled={!check(-1)}> <i className="fa-solid fa-pass"/> Change Password</Button>
  </div>
}