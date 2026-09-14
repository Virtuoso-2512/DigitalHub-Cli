import Button from '../../../components/button';
import { useEffect, useState } from 'react';
import Input from '../../../components/input';
import Select from '../../../components/select';
import { GlobalState } from '../../../GlobalParent';
import Switch from '../../../components/switch';
import toast from '../../../controllers/Alert';
import { Link } from 'react-router-dom';

export default function User_New(){
    const [name, setName] = useState(""),
          [email, setEmail] = useState(""),
          [designation, setDesignation] = useState(""),
          [Student, setStudent] = useState(false),
          [loading, setLoading] = useState(false),
          [agree, setAgree] = useState(false),
          [type, setPost] = useState(0),
          [dept, setDept] = useState(0),
          [batch, setBatch] = useState(0),
          [count, setCount] = useState(0),
          [deptOp, setDeptOp] = useState([]),
          [batchOp, setBatchOp] = useState([]),
          {username, get,post} = GlobalState();

    useEffect(async() => {
      const req = await get("department/get?query=type");
      setDeptOp(req.departments);
      
      const req2 = await get("batch/get");
      setBatchOp(req2.batches);

      const reqU = await get("user/count");
      setCount(reqU.count);
    }, [])
    

    const createUser = async() => {
        setLoading(true);
        const res = await post("user/create", {name, department:type===0?"":dept, teacher:type, email, typo:!Student, designation, batch});
        setLoading(false);
        
        if (!res.success) return toast(res.error || "Error in creating the User !");
        return toast(`User '${name}' is created successfully !`, 1);
    };

    const validateEmail = email => {
        return String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
    };

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between",width:"100%"}}>
            <h2 style={{textAlign:"center",margin:"1vw 0 1vw 43vw"}}>Create an new User</h2>
            <Link to="/user/manage"><Button variant={5}>Manage Users ({count} User{count===1?"":"s"})</Button></Link>
        </div>
        <span>This is under <b>{username}</b></span>
        <Input id="name" label="Username" value={name} style={{width:"400px"}} onChange={setName}/>
        <Input id="email" type="email" label="Email" value={email} style={{width:"400px"}} onChange={setEmail}/>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"15vw"}}>
            <h3 style={{color:!Student ? "#1972d6" : ""}}>Employee</h3>
            <Switch state={Student} onChange={setStudent}/>
            <h3 style={{color:Student ? "#1972d6" : ""}}>Student</h3>
        </div>
        {Student ? <Select id="batch" label="Batch" value={batch} style={{width:"400px"}} setOption={setBatch} options={batchOp} unique/> : <>
            <Select id="post" label="Department" value={dept} style={{width:"400px"}} setOption={setDept} options={deptOp} unique/>
            <Select id="post" label="Post" value={type} style={{width:"400px"}} setOption={setPost} options={dept ? (deptOp?.[dept]?.["type"] === 1 ? ["Principal", "Admin", "Employee", "Assisstant"] : ["Principal", "Vice Principal", "HOD", "Class Teacher", "General Teacher"]) : []}/>
            <Input label="Designation on Paper" value={designation} onChange={setDesignation}/>
        </>}   
        <br/>
        <Permission onClick={setAgree} state={agree} title="Agree to Tos (Terms of Service)" description={username + " Admin accepts on behalf of the User that the User will be bound to the Tos at all times on our Website."}/> 
        <Button disabled={loading || !(name && agree && email && validateEmail(email))} onClick={createUser} variant={1} style={{ margin: "0 10px" }} > Create New User</Button>
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
    </div></>
}