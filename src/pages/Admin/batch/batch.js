import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import Swal from 'sweetalert2';
import Popup from '../../../components/Popup';
import toast from '../../../controllers/Alert';
import Input from '../../../components/input';
import Select from '../../../components/select';
import Image from '../../../components/Image';

export default function BatchManage(props) {
    const {get, setTitle} = GlobalState(), [user, setUser] = useState({}), [active, setActive] = useState(-1);

    useEffect(async() => {
        const res = await get("batch/"+props.match.params.id);
        setUser(res);
        setTitle(res.name + " Batch")
    }, []);

    const options = ["Fees", "Subjects", "Divisions", "Students", "Employees"], compo = [ <Fee batch={props.match.params.id}/>, <Subjects batch={props.match.params.id}/>, <Divisions batch={props.match.params.id} bname={user?.name} sname={user?.department?.name || "N/A"} dept={user?.department?._id}/>, <Students batch={props.match.params.id} bname={user?.name}/>, <Employees sid={user?.department?._id} batch={props.match.params.id} sname={user?.department?.name || "N/A"}/> ];

    return <div id='lead-details' style={{display:"flex",flexDirection:"row",width:"99vw",flexWrap:"wrap"}}>
        <div style={{width:"24vw",maxWidth:"24vw"}}>
            <div style={{width:"24vw",maxWidth:"24vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                  <Link to="/batch/manage" style={{margin:"0 5px"}}><Button variant={6}><i className="fas fa-table"/> Go Back</Button></Link>
                  <Button variant={7} style={{margin:"0 5px"}} onClick={()=>Swal.fire({title:"Why Batches are not deletable ?",confirmButtonColor:"#1972d6",text:"Batches are an important link to students together. If given the permission to be deleted. In uncertain times, they would break all the links and students will get Scattered. Hence, batches are not deletable but if you don't to use them, just don't use them. Your plan supports unlimited Batches."})}><i className='fas fa-info-circle'/></Button>
                </div>
                <h2 style={{fontFamily:"Poppins",margin:"5px",textAlign:"center"}}>{user.name}</h2>
            </div>
            <div style={{height:"52vh",overflow:"auto"}}>
            <h3 style={{margin:"5px auto",width:"fit-content",fontFamily:"poppins"}}>Batch Info</h3>
            <h5>Batch Manager</h5>
            <span className="loader">{user?.manager?.name || "Not Allocated"}</span>
            <h5>Batch Department</h5>
            <span className="loader">{user?.department?.name|| "Not Allocated"}</span>
            <h5>Batch Institute</h5>
            <span className="loader">{user?.institute?.name}</span>
            <h5>Created At</h5>
            <span className="loader">{new Date(user?.createdAt).toLocaleString()}</span>
            <h5>Last Updated At</h5>
            <span className="loader">{new Date(user?.updatedAt).toLocaleString()}</span>
        </div></div>

        <div style={{display:"flex",flexDirection:"column",width:"75vw",margin:0,background:"var(--gradient)"}}>
            <div style={{display:"flex",flexDirection:"row",margin:"20px auto",justifyContent:"space-between",borderRadius:"18px",background:"var(--background)"}}>
                {options.map((option,idx) => <Button variant={6} onClick={()=>setActive(idx)} style={{margin:idx === 0 ? "0 20px 0 0" : (idx+1 === options.length ? "0 0 0 20px" : "0 20px"), fontSize:16}}>{option}</Button>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"fit-content",maxWidth:"75vw",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
            </div>
        </div>
    </div>
}

function Fee({batch}){
    return <div>
        <h2 style={{margin:"10px 5px",fontFamily:"Poppins"}}>Manage Batch Fee</h2>
        <span>This would be added in future versions.</span>
    </div>
}

function Subjects({batch}){
    const [open, setOpen] = useState(false), [subjects, setSubjects] = useState([{}]), [name, setName] = useState(""), [code, setCode] = useState(0), {get, post} = GlobalState();

    useEffect(async() => {
      const ss = await get("subject/"+batch);
      setSubjects(ss.subjects || []);
    }, [])
    

    const createDiv = async() => {
        const creation = await post("subject/create", {name,code,batch});

        if(!creation.success) return toast("Error in Subject Creation !")
        
        setOpen(false);
        setSubjects([...subjects, {name,code}]);
        setName("");
        setCode(0);
        return toast("Subject Created !", 1);
    }

    return <>
        <Popup open={open} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}}>Create a new Subject</span>}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Input label="Subject Name" value={name} onChange={setName}/>
            <Input type="number" label="Subject Code" value={code} onChange={setCode}/>
            
            <Button variant={4} onClick={createDiv}>Create Subject</Button>
            </div>
        </Popup>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <h2 style={{margin:"0 auto 0 10px",fontFamily:"Poppins"}}>Manage Subjects</h2>
                <Button variant={4} onClick={()=>setOpen(true)}><i className='fas fa-add'/> New Subject</Button>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",height:"fit-content",flexWrap:"wrap"}}>
                {subjects.map((sub,idx)=> <div style={{display:"flex",flexDirection:"column",background:"var(--background)", borderRadius:15,minWidth:"200px",maxWidth:"200px",margin:"5px 15px"}}>
                    <h6 style={{margin:"5px 15px"}}>Subject #{idx+1}</h6>
                    <h3 style={{fontFamily:"Poppins",margin:"10px 15px"}}>{sub.name}</h3>
                    <h5 style={{margin:"5px 15px"}}>Sub Code: {sub.code}</h5>
                </div>)}
            </div>
        </div>
        </>
}

function Divisions({batch, sname, bname, dept}){
    const [open, setOpen] = useState(false), [clOpen, setCLOpen] = useState(false), [stuOpen, setStuOpen] = useState(false), [cl, setCL] = useState([]), [stuList, setStuList] = useState([]), [divisions, setDivisions] = useState([]), [acl, setAcl] = useState(""), [active, setActive] = useState({name:"",_id:""}), [name, setName] = useState(""), [theme, setTheme] = useState(0), {get, post} = GlobalState();

    useEffect(async() => {
      const ss = await get("division/"+batch);
      setDivisions(ss.divisions || []);
    }, [])
    

    const createDiv = async() => {
        const creation = await post("division/create", {name,theme,batch});

        if(!creation.success) return toast("Error in Division Creation !")
        
        setOpen(false);
        setDivisions([...divisions, {name,theme}]);
        setName("");
        setTheme(0);
        return toast("Division Created !", 1);
    }, setCLReq = async() => {
        const newCL = await get("division/"+active._id+"/change?f=classTeacher&v="+acl);

        if(!newCL.success) return toast("Error in Class Teacher Updation !");

        setCLOpen(false);
        setActive({});
        setAcl("");

        const ss = await get("division/"+batch);
        setDivisions(ss.divisions || []);

        return toast("Class Teacher Updated Successfully !", 1);
    }

    useEffect(async() => {
        if(!clOpen) return;

        const dept3 = await get("user?prop=3&value=3&dept="+dept);
        setCL(dept3.users);
    }, [clOpen]);

    const showStudents = async(division) => {
        setStuOpen(true);
        const studn = await get("division/stu/"+division._id);
        setStuList(studn.stu || []);
    }

    const themeNames = [ "Oh So Pro Orange", "Ashville Joy", "Beach Blue", "High Blue", "Early Green", "Mystery Blue" ];

    return <>
        <Popup open={open} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}}>Create a new Division</span>}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Input label="Division Name" value={name} onChange={setName}/>
            <h6 style={{margin:5}}>Select Class Theme</h6>
            <p style={{fontSize:12,margin:0}}>Class Themes are colour-coded to help identify class easily!</p>
            <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                {themeNames.map((item,idx) => <div className={'theme-'+(idx+1)} style={{width:"40px",height:"40px",borderRadius:"50%",margin:5,border:theme===idx ? "3px solid #fff" : "3px solid transparent"}} onClick={()=>setTheme(idx)}/>)}
            </div>
            <Button variant={4} onClick={createDiv}>Create Division</Button>
            <h6>You can add Division Specific Teachers Later.</h6>
            </div>
        </Popup>

        <Popup open={clOpen} setOpen={setCLOpen} title={<span style={{fontFamily:"Poppins"}}>Set Class Teacher for {bname} {active.name}</span>}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Select label={"Select Class Teacher for " + bname + " " + active.name} value={acl} setOption={setAcl} options={cl} unique/>
            <Button variant={4} onClick={setCLReq}>Confirm Class Teacher for {active.name}</Button>
            <p style={{fontSize:12,margin:0}}>Teachers with "Class Teacher" Post and having Primary Department as "{sname}" ONLY appear here.</p>
            </div>
        </Popup>

        <Popup open={stuOpen} setOpen={setStuOpen} title={<span style={{fontFamily:"Poppins"}}>Viewing Students of {bname} {active.name}</span>}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"40vw"}}>
                
                {stuList.length ? stuList.map(user => <Link to={"/stu/"+user._id} style={{textDecoration:"none"}}><Button variant={7}><div style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'left',minWidth:"35vw"}}>
                    <Image src={"user/"+user._id} style={{margin: "0 10px 0 0"}} wh="60px" br="50%"/>     
                    <h4 style={{marginLeft:"10px", fontFamily:"Poppins"}}>{user.name}</h4>
                </div></Button></Link>) : <h5>No Students Allocated in this Division !</h5>}  
                
                <Button variant={4} onClick={()=>{setStuOpen(false);setActive({})}}>Okay, Got It !</Button>
            </div>
        </Popup>

        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <h2 style={{margin:"0 auto 0 10px",fontFamily:"Poppins"}}>Manage Divisions</h2>
                <Button variant={4} onClick={()=>setOpen(true)}><i className='fas fa-add'/> New Division</Button>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",height:"fit-content",flexWrap:"wrap"}}>
                {divisions.map(sub=> <div className={"theme-"+((sub.theme%6)+1)} style={{display:"flex",flexDirection:"column", borderRadius:15,minWidth:"69vw",maxWidth:"200px",margin:"15px auto",color:"#000"}}>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <h2 style={{fontFamily:"Poppins",margin:"10px 15px"}}>{sub.name}</h2>
                        <Button variant={4} style={{marginLeft:"auto"}}>View Class Posts</Button>
                        <Button variant={4} onClick={()=>{showStudents(sub);setActive(sub)}}>View Students</Button>
                    </div>
                    <h4 style={{margin:"5px 15px",color:"#000"}}>Class Teacher: <Button variant={5} onClick={()=>{setActive(sub); setCLOpen(true); setAcl(sub?.classTeacher?._id || "")}}>{sub?.classTeacher?.name || "N/A"}</Button></h4>
                </div>)}
            </div>
        </div>
        </>
}

function Students({batch, bname}){
    const [users, setUsers] = useState([]), {get} = GlobalState();

    useEffect(async() => {
      const ss = await get("batch/stu/"+batch);
      setUsers(ss.stu || []);
    }, [])

    return <div>
        <h2 style={{margin:"10px 5px",fontFamily:"Poppins"}}>Manage Students</h2>
        <span>Students Whose Batch is <code>{bname}</code> would appear here. To Change Student Batch or Division, Click on the Student name</span>
        {users.map(user => <Link to={"/stu/"+user._id} style={{textDecoration:"none"}}><Button variant={7}><div style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'left',minWidth:"65vw"}}>
            <Image src={"user/"+user._id} style={{margin: "0 10px 0 0"}} wh="60px" br="50%"/>     
            <h4 style={{marginLeft:"10px",marginRight:"auto", fontFamily:"Poppins"}}>{user.name}</h4>
            <p>{user?.division?.name ? (bname + " " + user?.division?.name) : <code>Not Allocated</code>}</p>
        </div></Button></Link>)}        
    </div>
}

//IMP - fix divisions, students glitches on Finding students, Employees

function Employees({sid, sname}){
    const [users, setUsers] = useState([]), role = ["Principal", "Vice Principal", "HOD", "Class Teacher", "General Teacher"], {get} = GlobalState();

    useEffect(async() => {
      const ss = await get("department/emp/"+sid);
      setUsers(ss.emp || []);
    }, [])

    return <div>
        <h2 style={{margin:"10px 5px",fontFamily:"Poppins"}}>Manage Employees</h2>
        <span>Employees Whose Department is <code>{sname}</code> would appear here. To Change Employee Department, Click on the Employee name</span>
        {users.map(user => <Link to={"/user/"+user._id} style={{textDecoration:"none"}}><Button variant={7}><div style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'left',minWidth:"65vw"}}>
            <Image src={"user/"+user._id} style={{margin: "0 10px 0 0"}} wh="60px" br="50%"/>     
            <h4 style={{marginLeft:"10px",marginRight:"auto", fontFamily:"Poppins"}}>{user.name}</h4>
            <p>{role[user.teacher]}</p>
        </div></Button></Link>)}        
    </div>
}