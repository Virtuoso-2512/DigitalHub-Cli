import { useEffect, useState } from 'react';
import { GlobalState } from '../GlobalParent';
import { Redirect } from 'react-router-dom';
import Button from '../components/button';
import toast from '../controllers/Alert';
import Swal from 'sweetalert2';
import "./activity.css";

function Sessions(){
    const { get, token } = GlobalState(), [sessions, setSessions] = useState({}), [changePass, setChangePass] = useState(false);

    const loadSessions = async() => {
      const res = await get(`../sessions`);

      const groupedDocuments = res.sessions.reduce((result, document) => {
        const date = new Date(document.LoggedInAt).toDateString();
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(document);
        return result;
      }, {});

      setSessions(groupedDocuments);
  }

    useEffect(()=>loadSessions(), []);

    const logout = (os = "Unknown", time, id) => {
        Swal.fire({
            title: "Logout from " + os + " device ?",
            text:"You can logout from this " + os + " device which logged in from " + new Date(time).toString().split(" GMT")[0] +". Once Logged out, the device will lose access to this account.",
            confirmButtonColor:"#1972d6",
            confirmButtonText:"Logout",
            showCancelButton:true
        }).then(async(res) => {
          if(!res.isConfirmed) return;
          
          const resOut = await get("../session/logout/"+id);
    
          if(resOut.success){
            loadSessions();
            return toast("Logged Out Successfully !", 1);
          }
          
          return toast("Error in Logout !");
        })
      };

      const oses = ["circle-exclamation", "microsoft", "apple", "linux", "android", "apple"];
      const osNames = ["Unknown OS", "Windows", "MacOS", "Linux", "Android", "iOS"];

    const showLocation = async(id) => {
      const res = await get("../session/"+id+"?param=loc");
      return toast("Location : " + res.session, 2);
    }, showIp = async(id) => {
      const res = await get("../session/"+id+"?param=ip");
      return toast("IP Address : " + res.session, 2);
    }, showSys = async(id) => {
      const res = await get("../session/"+id+"?param=systemName");
      return toast("You signed in to " + (res.session || "Unknown Device"), 2);
    };

    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"98vw",fontFamily:"Roboto"}} id="activity-main">
        <h1 style={{fontFamily:"Nunito"}}>Your Activity</h1>
        <h4 style={{margin:0}}>Security activity and alerts of the last 28 days. <u style={{color:"#1972d6"}} onClick={()=>Swal.fire({title:"Review security-related activity",text:"You can view security-related activity from the past 28 days to check for suspicious activity and help protect your account. If you want to see security activity older than 28 days, please contact your 'IT Admin' on Chat.",confirmButtonColor:"#1972d6",confirmButtonText:"Okay, Got it !"})}>Learn more</u></h4>
        <p>Sessions older than 28 days are automatically logged out.</p>
        <Button variant={3} onClick={()=>Swal.fire({title:"Let's secure your account !", text:"If there's recent activity you don't recognize, someone else might have your password. Change your password to protect your Account. You'll be signed out on all devices except the one you're using now.",showCancelButton:true,cancelButtonText:"Cancel",confirmButtonColor:"#1972d6",confirmButtonText:"Change Password"}).then((res)=>{if(res.isConfirmed) setChangePass(true)})}>See Unfamiliar Activity ?</Button>
        <div className='devices'>
            {Object.entries(sessions).map(([date, documents]) => (
              <div key={date}>
                <h3 style={{fontFamily:"Nunito"}}>{date}</h3>
                {documents.map((i,idx) => <div className='device box'>
                  <h4 style={{width:"5vw"}}>{(new Date(i.LoggedInAt).getHours() === 0 || new Date(i.LoggedInAt).getHours() === 12 ? "12" : (new Date(i.LoggedInAt).getHours() % 12))+":"+new Date(i.LoggedInAt).getMinutes().toString().padStart(2, '0')+" "+(new Date(i.LoggedInAt).getHours() >= 12 ? 'PM' : 'AM')}</h4>
                              
                  <p style={{width:"18vw"}}>New sign-in to <b>{osNames[i.os || 0]}</b> <i className={`fa-${i.os >= 1 ? "brands" : "solid"} fa-`+oses[i.os || 0]} style={{fontSize:20}}/></p>
                  
                  <div style={{width:"35vw", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center",height:"100%"}}>
                    {i._id === token ? <h4 style={{color:"#006900"}}>You are Logged in from Here</h4> : <>
                  {typeof(i.os) === "number" ? <Button variant={5} onClick={() => showSys(i._id)}><i style={{fontSize:18}} className={"fa-solid fa-"+(i.os < 4 ? "computer" : "mobile")}/></Button> : <div style={{width:"6vw"}}/>}
                      <Button variant={5} onClick={() => showLocation(i._id)}><i className="fa-solid fa-location-dot"/></Button>
                      <Button variant={5} onClick={() => showIp(i._id)}><i className="fa-solid fa-location-crosshairs"/></Button>
                      <div style={{maxWidth:"100px"}}>{i.active ? <Button variant={4} style={{margin:"0 1vw"}} onClick={()=>logout(osNames[i.os], i.LoggedInAt, i._id)}>Logout</Button>  : <h4 style={{color:"#bb0a1e"}}>Logged Out</h4>}</div>
                    </>}
                  </div>
                </div>)}
              </div>
            ))}
        </div>
        {changePass ? <Redirect to="/change-password"/> : <div/>}
    </div>;
}

export default Sessions;