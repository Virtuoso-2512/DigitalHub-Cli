import Button from '../../../components/button';
import { useState } from 'react';
import File from '../../../components/file';
import Input from '../../../components/input';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';

export default function Institute_New(){
    const [fileHandle, setFileHandle] = useState(""),
          [ndame, setName] = useState(""),
          [email, setEmail] = useState(""),
          [agree, setAgree] = useState(false),
          [loading, setLoading] = useState(false),
          {post, name} = GlobalState();

    const createInstitute = async() => {
        setLoading(true);
        const res = await post("institute/create", {name:ndame, email, icon:fileHandle});
        setLoading(false);
        
        if (!res.success) return toast("Error in creating the Institute !");
        return toast(`Institute ${ndame} is created successfully.`, 1);
    };

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2 style={{textAlign:"center",margin:"1vw auto"}}>Create a new Institute</h2>
        <Input id="name" label="Institute Name" value={ndame} style={{width:"400px"}} onChange={setName}/>
        <Input id="email" label="Email" value={email} style={{width:"400px"}} onChange={setEmail}/>
        <File id="insti_icon" label="Institute Icon" type="file" file={fileHandle} style={{width:"300px"}} onChange={setFileHandle}/>

        <label className="checkbox">The <b>{name} Governing Authority</b> intents to register <b>{ndame}</b> into the System. All the users will be legally bound to the <b>Terms of Service</b> at all times while using Our services.
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/>
            <span className="checkmark"/>
        </label>
        <br/>
        <Button disabled={loading || !(agree && ndame && fileHandle && email)} onClick={createInstitute} variant={1} style={{ margin: "0 10px" }} > Register Institute </Button>
    </div>;
}