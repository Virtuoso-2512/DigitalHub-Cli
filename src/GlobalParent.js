import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "./controllers/Alert";
import LocalStorage from "./controllers/LocalStorage";
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    /*Check If Laptop/Desktop*/  
    const BrowFind = () => {
        const userAgent = window.navigator.userAgent;
        if (/Opera|OPR/i.test(userAgent)) {
          return "Opera";
        } else if (/Edg/i.test(userAgent)) {
          return "Microsoft Edge";
        } else if (/Chrome/i.test(userAgent)) {
          return "Google Chrome";
        } else if (/Safari/i.test(userAgent)) {
          return "Apple Safari";
        } else if (/Firefox/i.test(userAgent)) {
          return "Mozilla Firefox";
        } else {
          return "Unknown";
        }
    }, detectDeviceType = () => {
        const userAgent = navigator.userAgent;
      
        // Regular expressions to match laptop and phone user agent patterns
        const laptopRegex = /Windows NT|Macintosh|Linux x86_64/;
        const phoneRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
      
        if (laptopRegex.test(userAgent)) {
          return "Laptop";
        } else if (phoneRegex.test(userAgent)) {
          return "Phone";
        } else {
          return "Unknown";
        }
    }

    const SERVER = process.env.REACT_APP_dev ? "http://localhost:8001/" : "https://erp-server-at.onrender.com/", BROWSER = BrowFind(), DEVICE = detectDeviceType();

    //Browser low security Standard
    if(BROWSER === "Unknown") Swal.fire({
        title:"Our are trying to access the site with an Unknown Browser !",
        text:"Please use any standard browser for security purposes.",
        showConfirmButton:false,
        allowOutsideClick:false
    });

    //Download the App
    if(DEVICE !== "Laptop") Swal.fire({
        title:"Our are trying to access from a Phone, Download the App !",
        text:"If you are using a laptop/desktop instead, Please use a standard browser or check browser settings.",
        showCancelButton:true,
        cancelButtonText:"Google Play Store",
        confirmButtonText:"Apple App Store",
        allowOutsideClick:false,
        confirmButtonColor:"#1972d6"
    }).then(res => {
        if(res.isConfirmed) window.open("https://apple.com")
        if(res.isDismissed) window.open("https://google.com")

        return;
    });
    
    const [pathname, setPathname] = useState("/"), roles = ["sa", "adm", "emp", "stu", "apli"];
    useEffect(() => setPathname(window.location.pathname), [window.location.pathname]);

    const [token, setTokenVoid] = useState(LocalStorage.get("token")),
        setToken = async(value) => {
            await LocalStorage.set("token", value);
            setTokenVoid(value);
        },  /*This State will act as Master State and be given first priority */
    
        /*The Below States are pretty Variable and shall not be stored on Storage */
        [title, setTitle] = useState(""),
        [navbar, setNavbar] = useState(true),
        [online, setOnline] = useState(true),

        [theme, setThemeVoid] = useState(LocalStorage.get("theme")),
        setTheme = async(value) => {
            await LocalStorage.set("theme", value);
            setThemeVoid(value);
        },

        [userLevel, setUserLevel] = useState(undefined),
        [role, setRole] = useState(undefined),
        [permissions, setPermissions] = useState({}),
        
        [username, setUsernameVoid] = useState(LocalStorage.get("username")),
        setUsername = async(value) => {
            await LocalStorage.set("username", value);
            setUsernameVoid(value);
        },

        [userId, setUserIdVoid] = useState(LocalStorage.get("userId")),
        setUserId = async(value) => {
            await LocalStorage.set("userId", value);
            setUserIdVoid(value);
        },

        [pfp, setPfpVoid] = useState(LocalStorage.get("pfp")),
        setPfp = async(value) => {
            await LocalStorage.set("pfp", value);
            setPfpVoid(value);
        },

        [InstituteId, setInstituteIdVoid] = useState(LocalStorage.get("InstituteId")),
        setInstituteId = async(value) => {
            await LocalStorage.set("InstituteId", value);
            setInstituteIdVoid(value);
        },

        [InstituteName, setInstituteNameVoid] = useState(LocalStorage.get("InstituteName")),
        setInstituteName = async(value) => {
            await LocalStorage.set("InstituteName", value);
            setInstituteNameVoid(value);
        },

        [InstituteIcon, setInstituteIcon] = useState(""),
        [InstituteBg, setInstituteBg] = useState(""),

        [DepartmentId, setDepartmentIdVoid] = useState(LocalStorage.get("DepartmentId")),
        setDepartmentId = async(value) => {
            await LocalStorage.set("DepartmentId", value);
            setDepartmentIdVoid(value);
        },

        [postId, setPostIdVoid] = useState(LocalStorage.get("postId")),
        setPostId = async(value) => {
            await LocalStorage.set("postId", value);
            setPostIdVoid(value);
        },

        [courseId, setCourseIdVoid] = useState(LocalStorage.get("courseId")),
        setCourseId = async(value) => {
            await LocalStorage.set("courseId", value);
            setCourseIdVoid(value);
        };

    const RequestPrefix = SERVER+"api/"+(typeof userLevel === "number" ? (roles[userLevel+1]+"/") : "");

    const post = async(link, body, sendHeaders=true, special="") => {
        const data = await axios.post(RequestPrefix+link, body, sendHeaders ? {headers:{authorisation:token, special}} : {})
        .then(res => { return res.data })
        .catch(err => { return "" });
    
        return data;
    }, get = async(link, special,sendHeaders=true) => {
        const data = await axios.get(RequestPrefix+link, sendHeaders ? {headers:{authorisation:token, special}} : {})
        .then(res => { return res.data })
        .catch(err => { return "" });
    
        return data;
    }, logout = (toaster = true) => {
        window.localStorage.clear();
        setToken("");
        setUserLevel(null);

        if(toaster) return toast("You've logged out. You need to sign-in again.");
        else return;
    };

    const getPost = async() => {
        const query = (userLevel !== undefined ? "" : "1");
        if(token && token.length === 24){
            const res = await get("auth/token?type="+query);
            if(!res.active) return logout();
            
            setUserLevel(res.userLevel);
            setUserId(res.userId);

            if(res.name) setUsername(res.name)
            setPfp(res.pfp || "user/my");

            if(res.userLevel === 1) {
                const reqq = await get((typeof userLevel === "number" ? "" : "emp/") + "permissions");
                setPermissions(reqq.permissions);
                setRole(reqq.role);
            }

            if(res.userLevel === 0) {
                const ress = await get("institute/icon/");
                setPfp(ress.icon || "school.jpg");
            }
        } else logout(false);
    }

    // const checkOnline = async() => {
    //     try{
    //         const online = await fetch(SERVER + "1pixel.png");
    //         return online.status >= 200 && online.status < 305;
    //     } catch (err) {
    //         return false;
    //     }
    // }

    // Suspended for malfunction
    // setInterval(async() => {
    //     const status = await checkOnline();
    //     setOnline(status);
    // }, 5000);

    useEffect(async() => {
        const insti = await get("insti");
        setTitle(insti.name || "ERP Website");
        setInstituteName(insti.name);
        setInstituteId(insti.id);
        setInstituteIcon(insti.icon);
        setInstituteBg(insti.bg);
        
        //Detect Dark Mode of System
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !theme) {
           setTheme("dark")
        }
        getPost();
        setInterval(async() => getPost(), 120000);

        return () => clearInterval(async() => getPost())
    }, []);

    useEffect(() => document.title = title.split("-").join(" ") + " | {{Product_Name}}", [title]);
    
    return <GlobalContext.Provider value={{role, SERVER,permissions, roles, setPfp, pfp,InstituteBg, setInstituteBg, InstituteIcon,setInstituteIcon, pathname, token, setToken,setTitle, navbar, setNavbar, online, theme, setTheme,userLevel,username, userId, InstituteId, InstituteName, setInstituteName, DepartmentId, setDepartmentId, postId, setPostId, courseId, setCourseId, post, get, logout, BROWSER, DEVICE}}> {children} </GlobalContext.Provider>
}

export const GlobalState = () => useContext(GlobalContext);
export default GlobalProvider