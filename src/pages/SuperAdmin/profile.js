import { useEffect, useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import toast from '../../controllers/Alert';
import { GlobalState } from '../../GlobalParent';
import File from '../../components/file';
import Tabs from '../../components/Tabs';
import Image from '../../components/Image';
import Theme from '../../components/theme';

export default function Profile() {
    const {get, post, InstituteBg, setInstituteBg, setInstituteIcon, InstituteIcon} = GlobalState(), [trust, setTrust] = useState(""), [name, setName] = useState("");
    const [email, setEmail] = useState(""), [tag, setTag] = useState("");
    const [bl, setBl] = useState(""), [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(async() => {
      const res = await get("group/profile");

      setTrust(res.trust);
      setName(res.name);
      setEmail(res.email);
      setLastUpdated(res.updatedAt)
      setIcon(res.icon);
    }, [])
    
    const save = async() => {
        setLoading(true);

        const res = await post("group/profile", {name, trust, email, bottomLine:bl, tagline:tag});

        setLoading(false);
        if (!res.success) return toast("Error in saving the Institute !");
        return toast("Saved successfully !!", 1);
    }

    useEffect(async() => {
        if(icon == InstituteIcon || !icon) return;
        setInstituteIcon(icon);
  
        const res = await get("group/icon/"+icon);

        if(res.success) return toast("Success !", 1);
        return toast("Error !");
    }, [icon]);  

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center",width:"98vw", flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",width:"97vw",justifyContent:"center"}}>
            <h2 style={{textAlign:"center",marginRight:"1vw"}}>Group of Institutes Profile Manager</h2>
        </div>
        <div style={{width:"42vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            
            <Input id="trust_name" label="Trust Name (common)" value={trust} style={{width:"400px"}} onChange={setTrust}/>
            <Input id="name" label="Group Institute Name" value={name} style={{width:"400px"}} onChange={setName}/>
            <Input id="grp_email" label="Group Institute Email" value={email} style={{width:"400px"}} onChange={setEmail}/>
        </div>
        <div style={{width:"56vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginBottom:"50px"}}> <span>Existing Icon :</span> <Image src={icon} br="10px" wh="100px"/> </div>
                <File id="insti_icon" label="Upload New Group Institute Icon" type="file" file={icon} style={{width:"250px"}} onChange={setIcon}/>
            </div>
        </div>
        <Button disabled={loading || !(name && trust && bl && email && tag)} onClick={save} variant={1} style={{ margin: "0 10px" }}> Save </Button>
        <br/>
        <span>Last Updated at : {new Date(lastUpdated).toLocaleDateString()}</span>
        <Theme/>
    </div>;
}