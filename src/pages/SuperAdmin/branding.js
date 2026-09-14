import {useEffect, useRef, useState} from 'react';
import { GlobalState } from '../../GlobalParent';
import Input from '../../components/input';
import toast from '../../controllers/Alert';

export default function Branding() {
    return <div style={{width:"85vw",margin:"10px 5vw",textAlign:"center"}}>
        <h2>Branding on Login</h2>
        <h4>Branding is the content that any user/visitor sees on your website during login on the left-hand side.</h4>
        <h5 style={{color:"#333"}}>Whenever You change any Content Text Input or Select a new Icon, the changes are auto-synced with the server !</h5>
        <Content idx={1}/>
        <Content idx={2}/>
        <Content idx={3}/>
    </div>
}

function Content({idx}){
    const [name, setName] = useState(""),[preIcon, setPreIcon] = useState(""),[prename, setPreName] = useState(""), {get, post} = GlobalState(), [iconI, setIcon] = useState("circle");
    const iconOptions = ["home", "award", "magnifying-glass", "user", "heart", "calendar-days", "bolt", "gift", "share", "fire", "code", "city", "layer-group", "link", "address-card", "server", "school", "wallet", "user-plus", "users", "users-line", "user-group", "user-graduate", "ranking-star"];

    useEffect(async() => {
      const ress = await get("branding?type="+idx); 
      
      setPreName(ress.name || ("Content-"+idx));
      setPreIcon(ress.icon || "circle");

      setName(ress.name || ("Content-"+idx));
      setIcon(ress.icon || "circle");
    }, []);

    const timerRef = useRef(null);
  
    useEffect(() => {
      if(prename === name) return;
      timerRef.current = setTimeout(async() => {
        const req = await post("branding/save?type=name&value="+name+"&idx="+idx);
        if(!req.success) return toast("Error in Content "+idx+" Name Change !");
        setPreName(name);
      }, 3000);
  
      return () => {
        clearTimeout(timerRef.current);
      };
    }, [name]); 
    
    useEffect(async() => {
      if(iconI === "circle" || iconI === preIcon) return;

      const req = await post("branding/save?type=icon&value="+iconI+"&idx="+idx);
      if(!req.success) return toast("Error in Content "+idx+" Icon Change !");
      else toast("Icon changed to : "+ iconI, 1);
    }, [iconI])
    
    return <div>
        <hr/>
        <h2>Content {idx}</h2>
        <div>
            <Input id={"branding-"+idx} label={"Content "+idx+" Text"} value={name} style={{width:"800px"}} onChange={setName}/>
            <i className={"fas fa-"+(prename === name ? "check" : "x")} title={"Changes"+(prename === name ? "" : " not")+" Synced with server."}/>
        </div>
        <h4>Select an Icon</h4>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row"}} className='icon-chooser'>
            {iconOptions.map(icon => <span className={(icon === iconI ? " active" : "")} onClick={()=>setIcon(icon)}><i className={"fas fa-"+icon}/></span>)}
        </div>
    </div>
}