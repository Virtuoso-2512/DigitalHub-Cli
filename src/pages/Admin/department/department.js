import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import Input from '../../../components/input';
import Popup from '../../../components/Popup';
import toast from '../../../controllers/Alert';
import Select from '../../../components/select';
import Swal from 'sweetalert2';

export default function DepartmentManage(props) {
    const {get, setTitle} = GlobalState(), [user, setUser] = useState({}), [active, setActive] = useState(-1), [open, setOpen] = useState(false), [open2, setOpen2] = useState(false), [name, setName] = useState(""), [manager, setManager] = useState(""), [mop, setMop] = useState([]);

    useEffect(async() => {
      const res = await get("department/"+props.match.params.id);
      setUser(res);
      setName(res.name);
      setManager(res.manager?._id);
      setTitle(res.name + " Department")
    }, []);

    const change = async(f, v) => {
      const exc = await get("department/"+props.match.params.id+"/change?f="+f+"&v="+v);

      if(!exc.success) return toast("Error in Changing "+f+" !");

      setOpen(false);
      setOpen2(false);
      setUser({...user,name});
      const f2 = f.charAt(0).toUpperCase() + f.slice(1);
      return toast(f2+" Changed Successfully !", 1);
    };

    const options = [ 
      ["View Batches", "View Employees"],
      ["View Employees"]
    ], compo = [ 
      [ ],
      [ ]
    ];
    const dept = ["Teaching (Staff & Students)", "Non-Teaching (Staff Only)"];

    useEffect(async() => {
      if(!open2) return;

      const res = await get("user/get?f=teacher&v=1&dept="+props.match.params.id);
      setMop(res.emps);
    }, [open2]);

    return <div id='lead-details' style={{display:"flex",flexDirection:"row",width:"99vw",flexWrap:"wrap",height:"89vh"}}>
      <Popup open={open} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}}>Change Department Name</span>}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <Input label="Department New Name" value={name} onChange={setName}/>
          <Button variant={4} onClick={()=>change("name", name)}>Change Department Name</Button>
        </div>
      </Popup>
      
      <Popup open={open2} setOpen={setOpen2} title={<span style={{fontFamily:"Poppins"}}>Change Department Manager</span>}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Select label="Department New Manager" state={manager} setOption={setManager} options={mop} unique/>
        <Button variant={4} onClick={()=>change("manager", manager)}>Change Department Manager</Button>
        </div>
      </Popup>

        <div style={{width:"24vw",maxWidth:"24vw",background:"var(--gradient-light)"}}>
            <div style={{width:"24vw",maxWidth:"24vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                  <Link to="/department/manage" style={{margin:"0 5px"}}><Button variant={6}><i className="fas fa-table"/> Go Back</Button></Link>
                  <Button variant={7} style={{margin:"0 5px"}} onClick={()=>Swal.fire({title:"Why Departments are not deletable ?",confirmButtonColor:"#1972d6",text:"Departments are an important link to connect you, employees, students and institutes together. If given the permission to be deleted. In uncertain times, they would break all the links and pose serious problems. Hence, departments are not deletable but if you don't to use them, just don't use them. Your plan supports unlimited Departments."})}><i className='fas fa-info-circle'/></Button>
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                  <h2 style={{fontFamily:"Poppins",margin:"5px",textAlign:"center"}}>{user.name}</h2>
                  <Button variant={7} onClick={()=>setOpen(true)}><i className='fas fa-pen'/></Button>
                </div>
            </div>
            <div style={{height:"fit-content",overflow:"auto"}}>
            <h3 style={{margin:"5px auto",width:"fit-content",fontFamily:"poppins"}}>Department Info</h3>
            <h5>Department Type</h5>
            <span className="loader">{dept[user?.type]}</span>
            <h5>Department Manager</h5>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <span className="loader">{user?.manager?.name ? <Link to={"/user/"+user?.manager?._id}><Button variant={6} style={{margin:"0",fontSize:16,fontFamily:"Poppins",color:"var(--color)"}}>{user?.manager?.name}</Button></Link> : "Not Allocated"}</span>
              <Button variant={7} onClick={()=>setOpen2(true)} style={{margin:"0 5px"}}><i className='fas fa-user-plus'/></Button>
            </div>
            <h5>Department Institute</h5>
            <span className="loader">{user?.institute?.name}</span>
            <h5>Created At</h5>
            <span className="loader">{new Date(user?.createdAt).toLocaleString()}</span>
            <h5>Last Updated At</h5>
            <span className="loader">{new Date(user?.updatedAt).toLocaleString()}</span>
        </div></div>

        <div style={{display:"flex",flexDirection:"column",width:"75vw",margin:0,background:"var(--background)"}}>
            <div style={{display:"flex",flexDirection:"row",margin:"20px auto",justifyContent:"space-between",borderRadius:"18px",background:"var(--gradient-light)"}}>
                {options[user?.type || 0].map((option,idx) => <Button variant={6} onClick={()=>setActive(idx)} style={{margin:idx === 0 ? "0 20px 0 0" : (idx+1 === options.length ? "0 0 0 20px" : "0 20px"), fontSize:16}}>{option}</Button>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"75vh",maxWidth:"65vw",overflow:"auto",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[user?.type][active]}
            </div>
        </div>
    </div>
}