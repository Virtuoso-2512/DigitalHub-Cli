import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import Input from '../../../components/input';
import Swal from 'sweetalert2';

export default function UserManage(props) {
    const {get, SERVER, setToken, post, setTitle} = GlobalState(), [user, setUser] = useState({}), [disable, setDisable] = useState(false), [active, setActive] = useState(-1);

    useEffect(async() => {
        const res = await get("user/"+props.match.params.id+"?query=");
        setUser(res);
        setDisable(res.disable);
        setTitle(res.name + " User")
    }, []);

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

    const Login = () => {
        const data= user;
        Swal.fire({
            title:"Login to User '"+data.name+"' ?",
            text:"You would be logged out of the current session and will be signed in through default 'Master Admin'",
            confirmButtonColor:"#1972d6",
            confirmButtonText:"Login",
            showCancelButton:true
        }).then(async(res) => {
            if(res.isConfirmed){

                await fetch("https://json.geoiplookup.io/?callback=").then(async(res)=>{
                res.text().then(async(rr)=>{
                    const hee = JSON.parse(rr.slice(1,rr.length-2));
                
                    if(hee.country_code === "IN"){
                        const reqReset = await post("user/login/"+data._id, {ip:hee.ip, loc:hee.city + ", " + hee.region, os, systemName,});

                        if(reqReset.token){
                            setToken(reqReset.token);
                            window.location = "/";
                            return;
                        }
                    
                        return toast("Error in Logging in !")
                    }
                })
                })
            }
            else return;
        })
    }, Disable = () => {
        const {name, _id} = user;
        const st = (disable ? "En" : "Dis")+"able";

        Swal.fire({
            title:st+" User '"+name+"' ?",
            text:"This User would lose access to thier accounts. This is reversible action.",
            confirmButtonColor:"#1972d6",
            confirmButtonText:st,
            showCancelButton:true
        }).then(async(res) => {
            if(res.isConfirmed){
                const disableReq = await get("user/able/"+_id+"?disable="+(disable ? "" : "1"));

                if(!disableReq.success) return toast("An Error Occured !");
                setDisable(!disable)
                return toast(st+"d "+name+" !", 1);
            }
            else return
        })
    };

    const options = [ "Profile", "User Activity", "Communication Logs", ""], compo = [  ]

    return <div id='lead-details' style={{display:"flex",flexDirection:"row",width:"99vw",flexWrap:"wrap",height:"89vh"}}>
        <div style={{width:"24vw",maxWidth:"24vw"}}>
            <div style={{width:"24vw",maxWidth:"24vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Link to="/user/manage" style={{marginRight:"auto"}}><Button variant={6}><i className="fas fa-arrow-left"/> Go Back</Button></Link>
                <img src={user.icon || SERVER+"user_default.jpg"} alt="User pfp" style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
                <h2 style={{fontFamily:"Poppins",margin:"5px",textAlign:"center"}}>{user.name}</h2>
                <div>
                <Button variant={4} onClick={Login}><i className='fas fa-right-to-bracket'/> Login</Button>
                <Button variant={5} onClick={Disable}><i className={'fas fa-user' + (disable ? "" : "-large-slash")}/> {disable ? "En" : "Dis"}able</Button>
            </div></div>
            <hr style={{color:"#000"}}/>
            <div style={{height:"40vh",overflow:"auto"}}>
            <h3 style={{margin:"5px auto",width:"fit-content",fontFamily:"poppins"}}>User Info</h3>
            <h5>Email</h5>
            <span className="loader">{user?.email}</span>
            <h5>User Institute</h5>
            <span className="loader">{user?.institute?.name}</span>
            <h5>User Post</h5>
            <span className="loader">{user?.post?.name}</span>
            <h5>Created At</h5>
            <span className="loader">{new Date(user?.createdAt).toLocaleString()}</span>
            <h5>Last Updated At</h5>
            <span className="loader">{new Date(user?.updatedAt).toLocaleString()}</span>
        </div></div>

        <div style={{display:"flex",flexDirection:"column",width:"75vw",margin:0,background:"var(--gradient)"}}>
            <div style={{display:"flex",flexDirection:"row",width:"90%",margin:"20px auto",justifyContent:"space-between",borderRadius:"6px",background:"var(--background)"}}>
                {options.map((option,idx) => <h4 className={'componChnager'+(idx===active?" active":"")} onClick={()=>setActive(idx)} style={{transition: "all .3s ease-in-out", margin:0,padding:"10px",borderRadius:"6px"}}>{option}</h4>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"75vh",maxWidth:"65vw",overflow:"auto",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
            </div>
        </div>
    </div>
}

function Institute_Allocate(props){
    const [student, setStu] = useState(0),
          [studentOrg, setStuOrg] = useState(0),
          [studentAuto, setStuAuto] = useState(false),

          [employee, setEmp] = useState(0),
          [employeeOrg, setEmpOrg] = useState(0),
          [employeeAuto, setEmpAuto] = useState(false),

          [loading, setLoading] = useState(false),
          {post,  get} = GlobalState();

    useEffect(async() => {
      const ress = await get("institute/"+props.id+"?query=licenses.employee licenses.student");
      setStu(ress.licenses?.student || 0);
      setStuOrg(ress.licenses?.student || 0);
      setStuAuto(ress.licenses?.student === -1 ? true : false);
      
      setEmp(ress.licenses?.employee || 0);
      setEmpOrg(ress.licenses?.employee || 0);
      setEmpAuto(ress.licenses?.employee === -1 ? true : false);
    }, [])
    

    const createInstitute = async() => {
        setLoading(true);
        const res = await post("institute/licenses/"+props.id, {student:studentAuto ? -1 : student, employee:employeeAuto ? -1 : employee});
        setLoading(false);
        
        if (!res.success) return toast("Error in updating Institute Licenses Allocation !");
        return toast(`Institute Licenses Allocation updated.`, 1);
    };

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <span style={{textAlign:"center",margin:"1vw auto",fontSize:"18px"}}>Allocate Licenses to a Specific Institute</span>   
        {!studentAuto ? <><Input id="sl" type="number" label="Student Licenses" value={student} style={{width:"400px"}} onChange={setStu}/>
        <span><b>Minimum value : {studentOrg}</b> (the number of currently active students)</span></> : <div/>}
        <label className="checkbox">Let <b>{props.insti}</b> register as many students as they want. NO LIMIT - Licenses cost real-money.
            <input type="checkbox" checked={studentAuto} onChange={e=>setStuAuto(e.target.checked)}/>
            <span className="checkmark"/>
        </label>
        <br/>
        <br/>
        {!employeeAuto ? <><Input id="el" type="number" disabled={employeeAuto} label="Employee Licenses" value={employee} style={{width:"400px"}} onChange={setEmp}/>
        <span><b>Minimum value : {employeeOrg}</b> (the number of currently active employees)</span></> : <div/>}
        <label className="checkbox">Let <b>{props.insti}</b> register as many employees as they want. NO LIMIT - Licenses cost real-money.
            <input type="checkbox" checked={employeeAuto} onChange={e=>setEmpAuto(e.target.checked)}/>
            <span className="checkmark"/>
        </label>
        <br/>
        <Button disabled={loading || !((studentAuto || student && student >= studentOrg)  && (employeeAuto || employee && employee >= employeeOrg))} onClick={createInstitute} variant={1} style={{ margin: "0 10px" }}> Update Licenses Allocation </Button>
    </div>;
}