import { useEffect, useMemo,useState } from 'react';
import toast from "../controllers/Alert.js";
import { useLocation } from 'react-router-dom';
import Button from '../components/button.js';
import { GlobalState } from '../GlobalParent.js';
import Footer from '../components/footer.js';
import Image from '../components/Image.js';
import Input from '../components/input.js';
import "./login.css";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function Login(){
    const { post, setToken, DEVICE,BROWSER, setNavbar, InstituteName, InstituteIcon, SERVER, get, primaryColor} = GlobalState(), query = useQuery();
    const [user, setUser] = useState(query.get("username") || "");
    const [pass, setPass] = useState(query.get("password") || "");
    const [slide, setSlide] = useState(1);
    const [makeover, setMakeover] = useState(true)//window.localStorage.getItem("noti") == 1 ? false : true);
    const [resetted, setResetted] = useState(false);
    const [branding, setBranding] = useState({name:"content",icon:"circle"})
    const [forgotPwd, setforgotPwd] = useState(false);

    setNavbar(false);

    useEffect(async() => {
        const gg = await get("branding?type="+slide);
        setBranding(gg?.name ? gg : {name:"content",icon:"circle"});
    }, [slide])

    const [os, setOs] = useState(''), [systemName, setSystemName] = useState('');
    
    useEffect(() => {
        const detectUserSystem = () => {
          const userAgent = window.navigator.userAgent.toLowerCase();
    
          if (userAgent.indexOf('win') !== -1) {
            setOs('Windows');
          } else if (userAgent.indexOf('mac') !== -1) {
            setOs('MacOS');
          } else if (userAgent.indexOf('linux') !== -1) {
            setOs('Linux');
          } else if (userAgent.indexOf('android') !== -1) {
            setOs('Android');
          } else if (userAgent.indexOf('ios') !== -1) {
            setOs('iOS');
          } else {
            setOs('Unknown');
          }
    
          setSystemName(window.navigator.platform);
        };
    
        detectUserSystem();
    }, []);
    

    const verify = async(e) => {
        e.preventDefault();

        //Check if Admin & prase username
        let username = user, admin = false, applicant = false;

        if(username.includes("Admin_")) {
            username = username.split("Admin_");
            admin=true;
            username = username[1];
        }

        if(username.includes("Applicant_")) {
            username = username.split("Applicant_");
            applicant=true;
            username = username[1];
        }

        if (username && pass){
            const da2ta = await post("auth/login"+(admin ? "_admin" : "")+(applicant ? "_applicant" : ""), {os, systemName:systemName + " (" + BROWSER +")",username, password:pass, ip:"ipAddress", loc: "data.city  ,  data.country_name  -  data.postal"}, false);
                        
            if(da2ta.token){
                setNavbar(true);
                setToken(da2ta.token);
                window.location = "/";
            } else toast("Invalid credentials !");

        }else toast("Please Enter All Your Details !")
        setUser("");
        setPass("")

    }, resetPwd = async(e) => {
        e.preventDefault();
        
        //Check if Admin & prase username
        let username = user, admin = false, applicant = false;

        if(username.includes("Admin_")) {
            username = username.split("Admin_");
            admin=true;
            username = username[1];
        }

        if(username.includes("Applicant_")) {
            username = username.split("Applicant_");
            applicant=true;
            username = username[1];
        }

        const res = await get("auth/reset"+(admin ? "_admin" : "")+(applicant ? "_applicant" : "")+"?username="+username);

        if(res.success){ setResetted(true);return toast("Password Reset Successful !", 1)}
        return toast("Error in resetting password !");
    };

    useEffect(() => setTimeout(() => setSlide(slide===3 ? 1 : slide+1), 3000), [slide]);

    return DEVICE === "Laptop" ? <><div style={{ width: "100%", height: "100vh",color:"var(--color)",display:"flex"}}>        
        <div className='brander2 Loginbox'>

            <div className="branding brr2" style={{margin:"0 auto"}} to="/">
                {InstituteIcon ? <img src="http://localhost:8001/logos/4.png" style={{width:"60px",height:"60px",borderRadius:"10px",margin:0,padding:0, margin:"0 1vw 0 0"}}/> : null}
                <h2 style={{color:"var(--color)"}}>{InstituteName}</h2>
            </div>

            <h1 style={{margin:0, marginTop:25}}>Login</h1>
            <p style={{margin:0, marginTop:5, marginBottom:25}}>Please login to continue in our app</p>

            {resetted ? <div><h3 style={{width:"35vw",margin:"20% auto",textAlign:"center"}}>We have sent you a mail regarding Password Reset.<br/> Please check your Inbox (Also, check spam/all mail). <br/>You can close this window/tab.</h3></div>: <div style={{display:"flex", justifyContent:"center",flexDirection:"column"}}>
                    
                    <Input id="username" label="Username" value={user} defaultValue={query?.get("user")?.split(" ").join(".") || ""} style={{width:"350px"}} onChange={setUser} onKeyDown={e => e.key === "Enter" ? (forgotPwd ? resetPwd(e) : document.getElementById("password").focus()) : false}/>

                    {!forgotPwd && <Input id="password" label="Password" type="password" disabled={forgotPwd} value={pass} defaultValue={query?.get("pass")} style={{width:"350px"}} onChange={setPass} onKeyDown={e => e.key === "Enter" ? verify(e) : false}/>}
                    
                    <h5 id="forgotspan" style={{marginLeft:"auto", fontFamily:"Nunito"}} onClick={()=>setforgotPwd(!forgotPwd)}>{forgotPwd ? "Back to Login" : "Forgot Your Password ?"}</h5>

                    {forgotPwd ? <Button variant={1} style={{ fontFamily:"Poppins", borderRadius:8,padding:"7px 50px",margin:"12px auto"}} disabled={!user} onClick={resetPwd}>Reset Password</Button> : <Button variant={1} buttonColor={primaryColor} style={{ fontFamily:"Poppins", borderRadius:8,padding:"7px 50px",margin:"12px auto"}} disabled={!user || !pass || pass.length < 8} onClick={verify}>Login</Button>}
            
            </div>}
        </div>
        {makeover ? <div className='makeover'>
            <p><span style={{fontWeight:"bolder"}}>**Dummy** This Site uses Cookies (Actually Not) !</span> This helps us to provide you the best experience on a website.</p>
            <Button variant={1} onClick={()=>{setMakeover(false);window.localStorage.setItem("noti","1")}}>X</Button> 
        </div> : <div/>}
    </div><Footer/></> : <div/>;
}

export default Login;