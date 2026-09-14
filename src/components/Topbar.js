import { NavLink as Link, useLocation, useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import "./Topbar.css";
import Swal from "sweetalert2";
import toast from "../controllers/Alert";
import { GlobalState } from '../GlobalParent';
import Button from "./button";
import Image from "./Image";
import SearchBar from "./SearchBar";

function Topbar(){
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 80) setIsScrolled(true);
        else setIsScrolled(false);
    };

    const history = useHistory();

    const location = useLocation(), [profileDropdown, setProfileDropdown] = useState(false), [statusDropdown, setStatusDropdown] = useState(false), [link, setLink] = useState(window.location.pathname);
    const { token,navbar,setTitle,online,pfp, InstituteName,InstituteIcon,userLevel, setToken, get } = GlobalState(), [status, setStatus] = useState(0), statuses= [ "Available", "Away", "DND", "Offline" ], colors = ["#33a333", "#ffda00", "#b90906", "#949494"];

    const title = (str) => {
        return str.toLowerCase().replace(/(^|\s)\S/g, function(t) {
          return t.toUpperCase();
        });
    };

    //Window Title Handler
    useEffect(() => {
        const path = window.location.pathname.slice(1).split("/").join(" ");
        if(typeof userLevel === "number") setTitle(title(path)+ " | " + (InstituteName || "ERP Website"))
    }, [window.location.pathname]);

    useEffect(() => setLink(location.pathname), [location.pathname]);
    
    const profileIcon = [InstituteIcon, pfp, pfp, pfp, pfp], logout = () => Swal.fire({
        title:"Do you want to Logout ?",
        html:"<i class='fa-solid fa-arrow-right-from-bracket' style='font-size:100px'/>",
        showCancelButton:true,
        cancelButtonText:"Return",
        confirmButtonText:"Logout",
        confirmButtonColor: "#1976d2"
    }).then(async(result)=>{
        if (!result.isConfirmed) return;
    
        const res = await get("../session/logout/"+token);
    
        if(!res.success) return toast("Error in Logout !");
    
        toast("Logged You Out !", 1)
        window.localStorage.clear();
        setToken("");
        window.location = "/login";
    });

    const profiles = [
        {to:"/your-activity",icon:"clock-rotate-left"},
        {to:"/change-password",icon:"key"},
        {to:"#",icon:"right-from-bracket"},
    ]

    return navbar ? <div className="TopMain" id="navbar"
        style={{
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            transform:"all 0.5s ease",
            width: '100%',
            height: isScrolled ? 0 : '75px',
            transition: 'height 0.4s',
            borderBottom: 'none',
        }}>
            <Link className="branding headerDiv" to="/" style={{display:"flex", flexDirection:"row", background:"transparent",textDecoration:"none",margin:"0 20px 0 0", width:"fit-content",alignItems:"center"}}>
            {InstituteIcon ? <img src="http://localhost:8001/logos/4.png" style={{width:"40px",height:"40px",borderRadius:"10px",margin:0,padding:0, margin:"0 1vw 0 0"}}/> : null}
            <h3>{InstituteName}</h3>
            </Link>

            {false ? <SearchBar/> : null}
            
            {online ? <>
            {token ? <div className="branding headerDiv">
                <div style={{margin:"5px 0 0 0"}}>
                </div>
                {userLevel === 3 ? <>
                    {profileIcon[userLevel+1] ? <div className="profile round">
                        <Image src={profileIcon[userLevel+1]} wh={35} br={"50%"}/>
                    </div>: <div className="loader" style={{width:"45px",height:"45px"}}/>}
                    <Button variant={6} style={{margin:"20px 10px"}} onClick={()=>{setProfileDropdown(false);logout()}}>Logout</Button>
                </> : <>                
                <div className={"status" + (statusDropdown?" active":"")} onMouseEnter={()=>setStatusDropdown(true)} onMouseLeave={()=>setStatusDropdown(false)}>
                    <span style={{width:"15px",height:"15px",background:colors[status],borderRadius:"50%"}}/>
                    <span style={{margin:"0 5px"}}>{statuses[status]}</span>
                    <i className="fa-solid fa-caret-down"/>
                </div>

                {statusDropdown ? <div id="status-dropdown" onMouseEnter={()=>setStatusDropdown(true)} onMouseLeave={()=>setStatusDropdown(false)}>
                    {statuses.map((item, idx)=> status !== idx ? <span key={item} onClick={()=>{setStatusDropdown(false); setStatus(idx)}}> <div className="round" style={{background:colors[idx],margin:"auto 5px", width:"15px",height:"15px",borderRadius:"50%"}}/> {item}</span> : <div/>)}
                </div> : <div/>}

                <div className={"profile" + (profileDropdown?" active":"")} onMouseEnter={()=>setProfileDropdown(!statusDropdown)} onMouseLeave={()=>setProfileDropdown(false)} onDoubleClick={()=>history.push("/profile")} style={{cursor:"pointer"}} title="Double-click to go to Profile!">
                    {profileIcon[userLevel+1] ? <div className="profile" style={{borderRadius:"50%"}}>
                        {/* <Image src={profileIcon[userLevel+1]} wh={35}/> */}
                        <i className="fas fa-user" style={{fontSize:"24px"}}/>
                    </div>: <div className="loader" style={{width:"45px",height:"45px"}}/>}
                </div>

                {profileDropdown ? <div id="profile-dropdown" onMouseEnter={()=>setProfileDropdown(true)} onMouseLeave={()=>setProfileDropdown(false)}>
                    {profiles.map(item => <Link to={item.to} onClick={()=>{
                        setProfileDropdown(false);
                        if(item.to === "#") logout();
                        }} style={{cursor:"default",textDecoration:"none",color:"var(--color)",padding:"10px 13px"}}>
                        <i className={"fas fa-"+item.icon} style={{fontSize:"18px"}}/>
                    </Link>)}
                </div> : null}</>}
            </div> : <Link to="/login" style={{textDecoration:"none"}}><Button variant={4} style={{margin:"20px 5px"}}>Login</Button></Link>}
        </>:null}</div> : <div/>;
}

export default Topbar;