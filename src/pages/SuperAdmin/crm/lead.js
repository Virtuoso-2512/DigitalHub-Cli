import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import Select from "../../../components/select";
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';

export default function Lead(props) {
    const {get, SERVER, permissions} = GlobalState(), [lead, setLead] = useState({}), [lactive, setLActive] = useState(0), [active, setActive] = useState(-1), [status, setStatus] = useState(0), [stages, setStages] = useState([]), [statuses, setStatuses] = useState([]), [rm, setRm] = useState({}), [rms, setRms] = useState([]);

    useEffect(async() => {
        const res = await get("crm/lead/"+props.match.params.id);

        setLead(res.lead || {});
        setStatus(res?.lead?.status || 0);
        setLActive(res?.lastSession || 0);
        setRm(res?.lead?.relationshipManager);
        
        const resStage = await get("static/lead-stages");
        const resStatus = await get("static/lead-status");

        setStages(resStage.options || []);
        setStatuses(resStatus.options || []);

        const rm = await get("crm/rm");
        setRms(rm.rms);
    }, []);

    const changeRM = async(rmID = "") => {
        if(rmID.length !== 24) return;

        const crm = await get("crm/lead/rm?id="+lead._id+"&rm="+rmID);

        if(crm.success) return setRm(rmID);
        return toast("Error in Lead Relationship Manager Change !");
    }, changeStatus = async(statu) => {
        if(typeof parseInt(statu) !== "number") return;

        const crm = await get("crm/lead/stage?id="+lead._id+"&stage="+parseInt(statu));

        if(crm.success) return setStatus(statu);
        return toast("Error in Lead Stage Change !");
    }, scoreColor = (score) => {
        var color = "#bf0000";

        if(score > 50) color = "#ffd300";
        if(score > 70) color = "#f58216";
        if(score > 80) color = "#08f26e";
        if(score > 90) color = "#059142";

        return color+"cc"
    }, options = [ "Application Form", "Activity (Timeline)", "Notes", "Communication", "Documents", "Calls"], compo = [ <LeadDetails/>, <Timeline creationTime={lead?.createdAt} lead={lead._id}/>, <FollowUp lead={lead._id}/>, <CommunicationLogs lead={lead._id}/> ]

    return <div id='lead-details' style={{display:"flex",flexDirection:"row",width:"96vw",flexWrap:"wrap",height:"89vh"}}>
        <div style={{width:"24vw",maxWidth:"24vw"}}>
            <div style={{width:"24vw",maxWidth:"24vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",width:"100%"}}>
                    <Link to="/crm/dashboard"><Button variant={3}><i className="fas fa-home"/></Button></Link>
                    <Link to="/crm/leads"><Button variant={3}><i className="fas fa-table"/></Button></Link>
                </div>
                <img src={SERVER+"assets/home/user.jpg"} alt="User pfp" style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
                <h2 style={{fontFamily:"Poppins",margin:"5px"}}>{lead.name}</h2>

                <Button variant={2}><i className='fas fa-plus'/> Add New Log</Button>
                {lactive ? <span style={{color:"#007a00",margin:"2px",fontSize:"14px"}}><b>Last Active On : {new Date(lactive).toDateString() + ", "+new Date(lactive).toLocaleTimeString()}</b></span> : <div/>}
                <h4 style={{fontFamily:"Poppins"}}>Lead Score : <span style={{color:scoreColor(lead.score || 0)}}>{lead.score || 0}</span> <span style={{borderRadius:"50%",fontSize:18}}><i className='fas fa-circle-info'/></span></h4>
            </div>
            <hr style={{color:"#000"}}/>
            <div style={{height:"28vh",overflow:"auto"}}>
            <h3 style={{margin:"5px auto",width:"fit-content",fontFamily:"poppins"}}>Lead Info</h3>
            <h5>Current Status</h5>
            <span className="loader">{stages[lead.stages || 0]}</span>
            <h5>Email</h5>
            <span className="loader">{lead.email} {lead.verified === 2 ? <i className='fas fa-check-circle'/> : <div/>}</span>
            <h5>Phone</h5>
            <span className="loader">+91 {lead.phone} {lead.verified === 1 ? <i className='fas fa-check-circle'/> : <div/>}</span>
            <h5>Institute</h5>
            <span className="loader">{lead?.institute?.name}</span>
            <h5>Course</h5>
            <span className="loader">{lead?.course?.name}</span>
            <h5>Lead on WhatsApp ?</h5>
            <span className="loader">{lead.WAAsk ? "Yes" : "No"}</span>
            <h5>State</h5>
            <span className="loader">{lead.state}</span>
            <h5>City</h5>
            <span className="loader">{lead.city}</span>
            <h5>User Device Info</h5>
            <span className="loader">{lead.DEVICE} ({lead.BROWSER})</span>
            <br/>
            <br/>
            <Select label="Lead Type" def="Lead Type" style={{width:"320px"}} value={status} setOption={changeStatus} options={statuses}/>
            <Select disabled={permissions?.crm?.view ? !permissions?.crm?.view : false} label="Relationship Manager" def="Relationship Manager (Current: Nobody)" style={{width:"320px"}} value={rm} setOption={changeRM} options={rms} unique/>
        </div></div>

        <div style={{display:"flex",flexDirection:"column",width:"71vw",margin:0,background:"var(--gradient)"}}>
            <div style={{display:"flex",flexDirection:"row",width:"90%",margin:"20px auto",justifyContent:"space-between",borderRadius:"6px",background:"var(--background)"}}>
                {options.map((option,idx) => <h4 className={'componChnager'+(idx===active?" active":"")} onClick={()=>setActive(idx)} style={{transition: "all .3s ease-in-out", margin:0,padding:"10px",borderRadius:"6px"}}>{option}</h4>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"75vh",maxWidth:"65vw",overflow:"auto",margin:0,padding:".2vw 2vw",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-up'/> Choose Anything from the Top Bar</h2> : compo[active]}
            </div>
        </div>
    </div>
}

function LeadDetails(){
    return <div></div>
}

function Timeline({creationTime, lead}){
    const [posts, setPosts] = useState([]), options = ["Follow Up", "Notes", "Change in Lead Status", "Change in RM" ], {get} = GlobalState();
    const [created, setCreated] = useState("");

    useEffect(async() => {
        if(!lead || lead?.length !== 24) return;
        const logss = await get("crm/logs/"+lead);
        setPosts([...posts, ...logss.logs]);
    }, [lead]);

    useEffect(() => {
      if(creationTime) setCreated(creationTime);
    }, [creationTime])

    return <div className="stepper-container-h">
        {posts.length ? posts.map(post => options[post.type-2] ? <div key={post._id}>
            <div className='step-label'>
                <label style={{padding:"10px",background:"#00639b",borderRadius:"50%"}}/>
                <h3 style={{color:"#00639b",margin:"5px"}}>{options[post.type-2]} !</h3>
            </div>
            <div className='step-content'>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span style={{fontFamily:"Nunito",marginLeft:"auto",fontSize:15}}>{new Date(post?.createdAt).toLocaleString()}</span>
                    <p>{post?.description}</p>
                    {post?.a ? <Link to={post.a.href} style={{marginLeft:"auto"}}><Button variant={3}>{post.a.title}</Button></Link> : <span/>}
                </div>
            </div>
        </div> : <div/>) : <div/>}
        <div key={""}>
            <div className='step-label'>
                <label style={{padding:"10px",background:"#00639b",borderRadius:"50%"}}/>
                <h3 style={{color:"#00639b",margin:"5px"}}>User Created !</h3>
            </div>
            <div className='step-content last-child'>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span style={{fontFamily:"Nunito",marginLeft:"auto",fontSize:15}}>{new Date(created).toLocaleString()}</span>
                    <p>User is created on this time. This is the first log in the system.</p>
                </div>
            </div>
        </div>
    </div>
}

function FollowUp(){
    return true ? <div/>:<><ul className="timeline">
        <li>
            <div className="icon"><i className='fas fa-clock' style={{fontSize:"24px",color:"#fff",margin:"8px 0 0 8px"}}/></div>
            <div className="post" style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"75%"}}>
                    <span className="time">11:00am</span>
                    <h3>Follow Up</h3>
                    <p>Assigned to : <b>ABC XYZ</b> <br/>
                    Due : <b>Dateee</b> <br/>
                    Status : <b style={{color:"blue"}}>Upcoming</b> <br/>
                    </p>
                </div>
                <div style={{width:"25%"}}>
                    <Button style={{marginLeft:"auto",marginTop:"20%"}} variant={3}>Mark as Complete</Button>
                </div>
            </div>
        </li>
        <li>
            <div className="icon"><i className='fas fa-note-sticky' style={{fontSize:"24px",color:"#fff",margin:"8px 0 0 8px"}}/></div>
            <div className="post" style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"75%"}}>
                    <span className="time">10:30am</span>
                    <h3>Note (Added by <b style={{fontWeight:"100"}}>ABC XYZ</b>)</h3>
                    <p>This is a sample note.</p>
                </div>
            </div>
        </li>
        <li>
            <div className="icon"></div>
            <div className="post" style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"75%"}}>
                    <span className="time">10:00am</span>
                    <h3>Follow Up</h3>
                    <p>Assigned to : <b>ABC XYZ</b> <br/>
                    Due : <b>Dateee</b> <br/>
                    Status : <b style={{color:"green"}}>Done</b> <br/>
                    </p>
                </div>
            </div>
        </li>
    </ul></>
} 

function CommunicationLogs({lead}){
    const [posts, setPosts] = useState([]), {get} = GlobalState(), [mail, setMail] = useState(0), [WA, setWA] = useState(0);

    function sortByProperty(arr, prop) {
        return arr.sort((a, b) => {
          if (a[prop] < b[prop]) {
            return -1;
          }
          if (a[prop] > b[prop]) {
            return 1;
          }
          return 0;
        });
    }

    useEffect(async() => {
        if(!lead || lead?.length !== 24) return;
        const logss = await get("crm/logs-communication/"+lead);

        setMail(logss.MailLogs.length || 0);
        setWA(logss.WaLogs.length || 0);

        //Merge Both Arrays
        const logs = [];
        logss.WaLogs.map(item => logs.push({...item, type:true}));
        logss.MailLogs.map(item => logs.push(item));

        const newArr = sortByProperty(logs, "created").reverse();

        setPosts([...posts, ...newArr]);
    }, [lead]);

    return <><div style={{height:"fit-content",width:"100%",display:"flex", justifyContent:"space-around"}}>
        <h2 style={{fontFamily:"Poppins"}}>Email Statistics</h2>
        <div>
            <h4>Email Sent : {mail}</h4>
            <h4>Email Opened : 0</h4>
            <h4>Email Clicked : 0</h4>
            <span>Opened & Clicked are still in preview!</span>
        </div>
        <h2 style={{fontFamily:"Poppins",height:"95%",borderLeft:"3px dashed #666",paddingLeft:"15px"}}>WhatsApp Statistics</h2>
        <div>
            <h4>WhatsApp Sent : {WA}</h4>
        </div>
    </div>
        <div className="stepper-container-h">
            {posts.length ? posts.map((post,idx) => <div key={post._id}>
                <div className='step-label'>
                    <label style={{padding:"10px",background:"#00639b",borderRadius:"50%"}}/>
                    <h3 style={{color:"#00639b",margin:"5px"}}>{post.type ? "WhatsApp" : "Mail"} Notification !</h3>
                </div>
                <div className={'step-content '+(posts.length === idx+1 ? "last-child" : "")}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{fontFamily:"Nunito",marginLeft:"auto",fontSize:15}}>{new Date(post?.created).toLocaleString()}</span>
                        <p>{post?.content.split("//?//")}</p>
                    </div>
                </div>
            </div>) : <div/>}
        </div></>
}