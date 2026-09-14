import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import Swal from 'sweetalert2';
import Select from '../../../components/select';

export default function UserManage(props) {
    const {get, SERVER, setToken, post, setTitle} = GlobalState(), [user, setUser] = useState({}), [disable, setDisable] = useState(false), [active, setActive] = useState(-1);

    useEffect(async() => {
        const res = await get("user/stu/"+props.match.params.id+"?query=division");
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

    const options = [ "Change Batch/Division", "Profile", "User Activity", "Fee Payment" ], compo = [ <ChangeBD user={user} setUser={setUser}/> ]

    return <div id='lead-details' style={{display:"flex",flexDirection:"row",width:"99w",flexWrap:"wrap",height:"89vh"}}>
        <div style={{width:"24vw",maxWidth:"24vw",background:"var(--gradient-light)"}}>
            <div style={{width:"24vw",maxWidth:"24vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"24vw",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Link to="/user/manage" style={{margin:"0 auto 0 5px"}}><Button variant={6}><i className="fas fa-table"/> Go Back</Button></Link>
                    <Button variant={4} onClick={Login} title="Login"><i className='fas fa-right-to-bracket'/></Button>
                    <Button variant={5} onClick={Disable} title={(disable ? "En" : "Dis")+"able"}><i className={'fas fa-user' + (disable ? "" : "-large-slash")}/></Button>
                </div>
                <img src={user.icon || SERVER+"user_default.jpg"} alt="User pfp" style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
                <h2 style={{fontFamily:"Poppins",margin:"5px",textAlign:"center"}}>{user.name}</h2>
            </div>
            <div style={{height:"fit-content",overflow:"auto"}}>
            <h3 style={{margin:"5px auto",width:"fit-content",fontFamily:"poppins"}}>User Info</h3>
            <h5>Email</h5>
            <span className="loader">{user?.email}</span>
            <h5>User Institute</h5>
            <span className="loader">{user?.institute?.name}</span>
            <h5>User Batch</h5>
            <span className="loader">{user?.batch?.name}</span>
            <h5>Created At</h5>
            <span className="loader">{new Date(user?.createdAt).toLocaleString()}</span>
            <h5>Last Updated At</h5>
            <span className="loader">{new Date(user?.updatedAt).toLocaleString()}</span>
        </div></div>

        <div style={{display:"flex",flexDirection:"column",width:"75vw",margin:0,background:"var(--background)"}}>
            <div style={{display:"flex",flexDirection:"row",margin:"20px auto",justifyContent:"space-between",borderRadius:"18px",background:"var(--gradient-light)"}}>
                {options.map((option,idx) => <Button variant={6} onClick={()=>setActive(idx)} style={{margin:idx === 0 ? "0 20px 0 0" : (idx+1 === options.length ? "0 0 0 20px" : "0 20px"), fontSize:16}}>{option}</Button>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"75vh",maxWidth:"65vw",overflow:"auto",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
            </div>
        </div>
    </div>
}

function ChangeBD({user, setUser}){
    const [div, setDiv] = useState(user?.division), [batch, setBatch] = useState(user?.batch?._id), [divOp, setDivOp] = useState([]), [batchOp, setBatchOp] = useState([]), {get} = GlobalState();

    useEffect(async() => {
        const req = await get("batch/get");
        setBatchOp(req.batches);

        const req2 = await get("division/"+batch);
        setDivOp(req2.divisions);
    }, [])
    

    const setBatchr = async() => {
        const setUserr = await get("user/stu/"+user._id+"/change?f=batch&v="+batch);
        if(!setUserr.success) return toast("Error in Updation !");

        const doc = batchOp.filter(doc => doc._id === batch);
        setUser({...user, batch:doc[0]});
        return toast("Updated Successfully !", 1);
    }, setDivr = async() => {
        const setUserr = await get("user/stu/"+user._id+"/change?f=division&v="+div);
        if(!setUserr.success) return toast("Error in Updation !");

        const doc = divOp.filter(doc => doc._id === div);
        setUser({...user, division:doc[0]});
        return toast("Updated Successfully !", 1);
    };

    return <div>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Select label="Select Student Batch" value={batch} setOption={setBatch} options={batchOp} unique/>
        <Button variant={4} onClick={setBatchr}>Set Student Batch</Button>
        <Select label="Select Student Division" value={div} setOption={setDiv} options={divOp} unique/>
        <Button variant={4} onClick={setDivr}>Set Student Division</Button>
        </div>
    </div>
}