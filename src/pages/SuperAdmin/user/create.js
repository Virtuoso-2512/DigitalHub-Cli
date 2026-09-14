import Button from '../../../components/button';
import { useEffect, useState } from 'react';
import Input from '../../../components/input';
import Select from '../../../components/select';
import { GlobalState } from '../../../GlobalParent';
import Switch from '../../../components/switch';
import toast from '../../../controllers/Alert';
import { Link } from 'react-router-dom';

export default function User_New(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""),
          [designation, setDesignation] = useState(""),
          [loading, setLoading] = useState(false),
          [agree, setAgree] = useState(false),
          perm = {},
          [type, setPost] = useState(0),
          [count, setCount] = useState(0),
          [postOp, setPostOp] = useState([]),
          {InstituteName, get,post, InstituteId} = GlobalState();

    useEffect(async() => {
      const req = await get("post/?noType=1");
      setPostOp(req.posts);

      const reqU = await get("user/count?institute="+InstituteId);
      setCount(reqU.count);
    }, [])
    

    const createUser = async() => {
        console.log(perm);
        setLoading(true);
        const res = await post("user/create", {name, post:type, email, designation});
        setLoading(false);
        
        if (!res.success) return toast(res.error || "Error in creating the User !");
        return toast(`User '${name}' is created successfully !`, 1);
    };

    const validateEmail = (email) => {
        return String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
    };

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2 style={{textAlign:"center",margin:"1vw auto"}}>Create an new User</h2>
        <span>ONLY Non-Teaching Faculty could be created here as this is directly under <b>{InstituteName}</b></span>
        <Input id="name" label="Username" value={name} style={{width:"400px"}} onChange={setName}/>
        <Input id="email" type="email" label="Email" value={email} style={{width:"400px"}} onChange={setEmail}/>
        <Input label="Designation on Paper" value={designation} onChange={setDesignation}/>
        <Select id="post" label="Post" value={type} style={{width:"400px"}} setOption={setPost} unique options={postOp}/>   
        <br/>
        <Permission onClick={setAgree} state={agree} title="Agree to Tos (Terms of Service)" description="The Group accepts on behalf of the User that the User will be bound to the Tos at all times on our Website."/> 
        <Button disabled={loading || !(name && agree && email && type && type.length === 24 && validateEmail(email))} onClick={createUser} variant={1} style={{ margin: "0 10px" }} > Create New User</Button>
        <Link to="/user/manage"><Button variant={6}>Manage Users ({count} User{count===1?"":"s"})</Button></Link>
    </div>;
}

function Permission({state, onClick, title, description}){
    return <><div style={{display:"flex"}}>
        <div style={{width:"85%"}}>
            <h4>{title}</h4>
            <span style={{marginTop:"0",marginBottom:"70px"}}>{description}</span>
        </div>
        <div style={{marginLeft:"auto"}}>
            <Switch state={state} onChange={onClick}/>
        </div>
    </div><hr style={{color:"#333"}}/></>
}