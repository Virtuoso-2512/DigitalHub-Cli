import { useEffect, useState } from 'react';
import { GlobalState } from '../GlobalParent.js';
import Button from '../components/button';
import toast from '../controllers/Alert.js';
import Swal from 'sweetalert2';

function Logs(){
    const { get,SERVER,token,superAdmin } = GlobalState(), [sessions, setSessions] = useState([{ip:"No sessions found !",os:3,btns:[] ,loc:"Please try again later."}]), oses = ["windows", "mac", "linux", "IOS", "android"];

    useEffect(async()=>{
        const res = await get(`${superAdmin ? "superL" : "l"}ogs?type=1`);
        setSessions(res.sessions || []);
    }, []);

    const getSessions = async() => {
        const res = await get(`${superAdmin ? "superL" : "l"}ogs`);
        setSessions(res.sessions || []);
    },logout = (ip, os, loc,idx) => {
        Swal.fire({
            title: "Logout from " + ip + " ?",
            text:"You can logout from " + os + " which logged in from " + loc +". Once Logged out, the device will lose access to this account.",
            confirmButtonColor:"#1972d6",
            confirmButtonText:"Logout",
            showCancelButton:true,
            cancelButtonText:"Return"
        }).then(async(res) => {
          if(!res.isConfirmed) return;
          
          const resOut = await get("logout/"+sessions[idx]["_id"]);
    
          if(resOut.success){
            const removed = sessions;
            removed[idx]["active"] = false; 
            setSessions(removed);
            return toast("Logged Out Successfully !", 1);
          }
          
          return toast("Error in Logout !");
        })
      };

    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"98vw"}} id="activity-main">
        <h1>Sessions</h1>
        <div className='devices'>
            {sessions.map((i,idx) => <div className='device box' style={{width:"45vw"}}>
              <div style={{width:"12vw"}}>
                <div>
                  <img src={SERVER+"/os/"+ oses[i.os] +".png"} alt="imageot"/>
                  <h3>{oses[i.os]}</h3>
                </div>
                <i className={`fa-solid fa-computer`} style={{fontSize:75,marginTop:"20px"}}></i>
              </div>
              
              <div style={{width:"25vw", display:"flex",flexDirection:"column",justifyContent:"space-around",height:"170px",alignItems:"center"}}>
                <h4>Location : {i.loc}</h4>
                <h4>{new Date(i.loggedInAt).toString().split(" GMT")[0]}</h4>
                <h4 style={{color:"#1972d6"}}>{i?.issuer?.name ? `Issued By : ${i.issuer.name}` : ""}</h4>

                {i._id === token ? <h4 style={{color:"#006900"}}>You are Logged in from Here</h4> : <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-around"}} id="ddddddddddd">
                  <button onClick={() => toast("IP Address :" + i.ip, 2)}><i className="fa-solid fa-location-dot"/> Location</button>
                  {i.active ? <button onClick={()=>logout(i.ip, oses[i.os], i.loc, idx)}><i className="fa-solid fa-arrow-right-from-bracket"/> Logout</button>  : <h4 style={{color:"#bb0a1e"}}>Logged Out</h4>}
                </div>}
              </div>

            </div>)}
        </div>
        {sessions.length === 9 ? <Button onClick={getSessions} variant="contained" style={{ margin: "0 10px" }}>Show All Sessions</Button> : <div/>}
    </div>;
}

export default Logs;