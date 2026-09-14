import { NavLink as Link} from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import { GlobalState } from '../GlobalParent';
import ImageServer from "./Image";

function Sidebar(){
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [statusDropdown, setStatusDropdown] = useState(false);
    const [insti, setInsti] = useState({id:"",name:""});
    const { token,navbar,SERVER, name,setTheme,theme,employee, get,platformIsLaptop } = GlobalState(), [status, setStatus] = useState(0), statuses= [ "Available", "Away", "DND", "Offline" ], colors = ["#33a333", "#ffda00", "#b90906", "#949494"];

    const handler = () => {
        if(theme === "dark") return setTheme("");

        return setTheme("dark");
    }

    const links = [
        {icon:"house",link:"",name:"dashboard"},
        {icon:"cloud",link:"cloud"}, 
        {icon:"book",link:"classroom"}, 
        {icon:"message",link:"connect"},
        {icon:"user",link:"profile"}
    ];

    useEffect(async() => {
        const res = await get("auth/insti");

        setInsti({id:res._id, name:res.name})
    }, [])
    

    return navbar ? <><div className={"TopMain" + (token? "" :" noBar")}>
                <Link className="branding headerDiv" to="/" style={{display:"flex", flexDirection:"row", background:"transparent",textDecoration:"none",color:"#222",margin:"0 auto 0 0", width:"fit-content",alignItems:"center"}}>
                    <img src={SERVER+"/Logo.png"} style={{margin:"0 1vw 0 0"}} width="45" height="45"/>
                    <h3>{name || "Indira Group of Institutes"}</h3>
                    <img src={SERVER+"/Insti_Logo.png"} style={{margin:"0 0 0 1vw"}} width="50" height="50"/>
                </Link>
            {token ? <div className="branding headerDiv">
                <div className="status" onClick={()=>setStatusDropdown(!statusDropdown)}>
                    <span style={{width:"20px",height:"20px",background:colors[status],borderRadius:"50%"}}/>
                    <span style={{margin:"0 5px"}}>{statuses[status]}</span>
                    <i className="fa-solid fa-caret-down"/>
                </div>

                {statusDropdown ? <div id="status-dropdown">
                    {statuses.map((item, idx)=> <span onClick={()=>{setStatusDropdown(false); setStatus(idx)}}> <div className="round" style={{background:colors[idx],margin:"auto 5px", width:"15px",height:"15px",borderRadius:"50%"}}/> {item}</span>)}
                </div> : <div/>}
                
                <div className="profile" onClick={()=>setProfileDropdown(!profileDropdown)}>
                    <ImageServer url={"profile/pic/my.jpg"} wh={35} br={"50%"}/>
                </div>

                {profileDropdown ? <div id="profile-dropdown">
                    <Link to="/profile" onClick={()=>setProfileDropdown(false)} style={{textDecoration:"none",color:"#222",padding:"10px"}}>
                        Profile
                    </Link>
                    <Link to="/logout" onClick={()=>{window.localStorage.clear();setProfileDropdown(false)}} style={{textDecoration:"none",color:"#222",padding:"10px"}}>
                        Logout
                    </Link>
                </div> : <div/>}
            </div> : <Link to="/login" style={{textDecoration:"none",color:"#000"}}><button style={{margin:"20px 5px"}} id="apnabtn">Sign In</button></Link>}
        </div>
        {token ? <div className="sidebarMain">
        <div className="sidebar">
            <div className="nav-list">
                {platformIsLaptop ? <>{links.map((item)=><li key={item}>
                    <Link to={`/${item.link}`}>
                        <div className="container">
                            <i className={"fa-solid fa-"+item.icon}/>
                        </div>
                    </Link>
                    <span className="tooltip">{item.link || item.name}</span>
                </li>)}

                <li key="Money">
                    <Link to={employee ? `/salary` : "/fees"}>
                        <div className="container">
                            <i className={"fa-solid fa-indian-rupee-sign"}/>
                        </div>
                    </Link>
                    <span className="tooltip">{employee ? "Salary" : "Fees"}</span>
                </li></> : <><li key="Download">
                    <a href="#" onClick={()=>window.open("https://google.com/")}>
                        <div className="container">
                            <i className={"fa-brands fa-google-play"}/>
                        </div>
                    </a>
                    <span className="tooltip">Download</span>
                </li><li key="Download">
                    <a href="#" onClick={()=>window.open("https://apple.com/")}>
                        <div className="container">
                            <i className={"fa-brands fa-app-store-ios"}/>
                        </div>
                    </a>
                    <span className="tooltip">Download</span>
                </li></>}
                
                <li style={{background:"none",marginTop:"auto"}}>
                    <label class="switch">
                        {platformIsLaptop ? <div className="container">
                            <input type="checkbox" checked={theme === "dark" ? true : false} onClick={handler}/>
                            <span class="slider round"></span>
                        </div> : <div/>}
                        <span className="tooltip">Change Theme</span>
                    </label>
                </li>
            </div>
        </div> 
    </div>: <div/>}</> : <div/>;
}

export default Sidebar;