import { useEffect, useRef, useState } from 'react';
import Input from '../../components/input';
import toast from '../../controllers/Alert';
import { GlobalState } from '../../GlobalParent';
import File from '../../components/file';
import Image from '../../components/Image';
import Theme from '../../components/theme';

export default function Profile() {
    const {get, setPfp, pfp, setInstituteIcon, InstituteIcon} = GlobalState(), [prename, setPreName] = useState(""), [name, setName] = useState(""), [email, setEmail] = useState(""), [loading, setLoading] = useState(false), [icon, setIcon] = useState(""), [lastUpdated, setLastUpdated] = useState("");

    useEffect(async() => {
      const res = await get("institute/profile?query=name email updatedAt");

      setName(res.name);
      setPreName(res.name);
      setEmail(res.email);
      setLastUpdated(res.updatedAt)
    }, [])
    
    const timerRef = useRef(null);
  
    useEffect(() => {
        if(prename === name) return;

        timerRef.current = setTimeout(async() => {
            const req = await get("institute/name?value="+name);
            if (!req.success) return toast("Error in saving Institute Name !");
            setPreName(name);
            return toast("Saved successfully !!", 1);
        }, 3000);
  
        return () => clearTimeout(timerRef.current);
    }, [name]); 

    useEffect(async() => {
        if(icon == InstituteIcon || !icon) return;
        setInstituteIcon(icon);
  
        const res = await get("institute/icon/"+icon);

        if(res.success){ 
            setPfp(icon);
            return toast("Success !", 1);
        }
        return toast("Error !");
    }, [icon]);

    return <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",width:"98vw", flexWrap:"wrap"}}>
        <h2 style={{textAlign:"center",marginRight:"1vw"}}>Institute Profile Manager</h2>
        <div>
            <Input id="name" label="Institute Name" value={name} style={{width:"400px"}} onChange={setName}/>
            <i className={"fas fa-"+(prename === name ? "check" : "x")} title={"Changes"+(prename === name ? "" : " not")+" Synced with server."}/>
        </div>
        <Input disabled id="email" label="Institute Email" value={email} style={{width:"400px"}} onChange={setEmail}/>
        <span>Institute Email can ONLY be changed by Group Admin</span>
        <br/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",margin:"30px 0"}}> <span>Existing Icon :</span> <Image src={pfp} br="10px" wh="100px"/> </div>
        <File id="insti_icon" label="Upload New Institute Icon" type="file" file={icon} style={{width:"250px"}} onChange={setIcon}/>
        <br/>
        <span>Last Updated at : {new Date(lastUpdated).toLocaleDateString()}</span>
        <Theme/>
    </div>;
}