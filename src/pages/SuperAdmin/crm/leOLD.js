import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import Input from "../../../components/input";
import Select from "../../../components/select";
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import { CRMHeader } from './dashboard';

export default function Lead(props) {
    const {get, SERVER, permissions} = GlobalState(), [lead, setLead] = useState({}), [active, setActive] = useState(1), [status, setStatus] = useState(0), [stages, setStages] = useState([]), [statuses, setStatuses] = useState([]), [rm, setRm] = useState({}), [rms, setRms] = useState([]);

    useEffect(async() => {
        const res = await get("crm/lead/"+props.match.params.id);

        setLead(res.lead || {});
        setStatus(res.lead.stage || 0);
        setRm(res.lead.relationshipManager);
        
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
    }, options = [
        {icon:"user", title:"Lead Details"},                //0
        {icon:"clock-rotate-left", title:"User Activity (Timeline)"},  //1
        {icon:"note-sticky", title:"Follow-up & Notes"},    //2
        {icon:"envelope", title:"Communication Stats"},      //3
        {icon:"folder", title:"Document Locker"},           //4
    ], compo = [ <LeadDetails lead={lead}/>, <Timeline creationTime={lead?.createdAt} lead={lead._id}/>, <FollowUp lead={lead._id}/>, <CommunicationLogs lead={lead._id}/> ]

    return <><CRMHeader/><div id='lead-details' style={{display:"flex",flexDirection:"row",padding:"2vw",flexWrap:"wrap"}}>
        
        <div id="lead-start" style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"30vw",background:"linear-gradient(to right bottom, #1972d633, #1972d699)",borderRadius:"10px"}}>
            <img src={SERVER+"assets/home/user.jpg"} alt="User pfp" style={{width:"150px",height:"150px"}}/>
            <div>
                <h2 style={{fontFamily:"Poppins"}}>Lead Details</h2>
                <h5>Name: <span className="loader">{lead.name}</span></h5>
                <h5>Email: <span className="loader">{lead.email}</span> {lead.verified === 2 ? <i className='fas fa-check-circle'/> : <div/>}</h5>
                <h5>Phone: <span className="loader">+91 {lead.phone}</span> {lead.verified === 1 ? <i className='fas fa-check-circle'/> : <div/>}</h5>
                <h5>Current Status: <span style={{borderRadius:"5px",padding:"3px 5px",color:"#fff", background:"#666"}}>{statuses[lead.status || 0]}</span></h5>
            </div>
        </div>
        <div id="lead-start" style={{display:"flex",background:scoreColor(lead.score || 0),flexDirection:"column",justifyContent:"center",alignItems:"center",margin:"0 5vw",width:"15vw",borderRadius:"10px"}}>
            <h4 style={{margin:"5px 0",fontFamily:"Poppins"}}>Lead Score</h4>
            <h1 style={{margin:"0",fontSize:"96px",color:"#444"}}>{lead.score || 0}</h1>
            <span style={{border:"1px solid #333",padding:"2px 10px",borderRadius:"25px",background:"#333",cursor:"pointer",fontSize:12}}><i className='fas fa-circle-info'/> View Breakup</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",background:"linear-gradient(to right bottom, #E8BC8533, #E8BC8599)",justifyContent:"center",alignItems:"left",width:"30vw",borderRadius:"10px",padding:"1vw 2.5vw"}}>
            <Select label="Lead Type" def="Lead Type" style={{width:"300px"}} value={status} setOption={changeStatus} options={stages}/>
            <Select disabled={permissions?.crm?.view ? !permissions?.crm?.view : false} label="Relationship Manager" def="Relationship Manager (Current: Nobody)" style={{width:"450px"}} value={rm} setOption={changeRM} options={rms} unique/>
        </div>

        <div style={{display:"flex",flexDirection:"row",width:"90vw",margin:"2vw 0 0 0"}}>
            <div style={{display:"flex",flexDirection:"column",width:"18vw"}}>
                {options.map((option,idx) => <h4 className={'componChnager'+(idx===active?" active":"")} onClick={()=>setActive(idx)} style={{margin:"6px 0",padding:"10px 20px",width:"95%",border:"1px solid #00000066", cursor:"pointer",borderRadius:"10px",justifyContent:"center"}}><i className={"fa-solid fa-"+option.icon} style={{fontSize:"24px",marginRight:"10px"}}/> {option.title}</h4>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",minWidth:"65vw",maxWidth:"65vw",height:"50vh",overflow:"auto",margin:"0 0 0 5vw",padding:".2vw 2vw",background:"#eee",borderRadius:"10px"}}>
                {active === -1 ? <h2 style={{fontFamily:"Poppins",margin:"auto"}}><i className='fas fa-arrow-left'/> Select Any Option from the Left Bar</h2> : <><h2 style={{position:"sticky",top:0,padding:"5px 25px",borderRadius:"8px",background:"#bbb",display:"flex",justifyContent:"space-between"}}>{options[active]["title"]} {active === 2 ? <div style={{marginLeft:"auto"}}>
        <Button style={{margin:"0 1vw"}} variant={1}><i className='fas fa-pen'/> Add Note</Button>
        <Button style={{margin:"0 1vw"}} variant={3}><i className='fas fa-clock-rotate-left'/> Add Follow Up</Button>
    </div> : <div/>}</h2>{compo[active]}</>}
            </div>
        </div>
    </div></>
}

function LeadDetails({lead}){
    return <div>
        <Input id="name" label="Lead Name" value={lead.name} style={{width:"400px"}} disabled/>
        <Input id="institute" label="Institute" value={lead.institute.name} style={{width:"400px"}} disabled/>
        <Input id="course" label="Course" value={lead.course.name} style={{width:"400px"}} disabled/>
        <Input id="WAAsk" label="Lead on WhatsApp ?" value={lead.WAAsk ? "Yes" : "No"} style={{width:"400px"}} disabled/>
        <Input id="city" label="City" value={lead.city} style={{width:"400px"}} disabled/>
        <Input id="state" label="State" value={lead.state} style={{width:"400px"}} disabled/>
    </div>
}

function Timeline({creationTime, lead}){
    const [posts, setPosts] = useState([]), options = ["Mail Notification", "WhatsApp Notification", "Follow Up", "Notes", "Change in Lead Status", "Change in RM" ], {get} = GlobalState();
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
        {posts.length ? posts.map(post => <div key={post._id}>
            <div className='step-label'>
                <label style={{padding:"10px",background:"#666",borderRadius:"50%"}}/>
                <h3 style={{color:"#666",margin:"5px"}}>{options[post.type]} !</h3>
            </div>
            <div className='step-content'>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span style={{fontFamily:"Nunito",marginLeft:"auto",fontSize:15}}>{new Date(post?.createdAt).toLocaleString()}</span>
                    <p>{post?.description}</p>
                    {post?.a ? <Link to={post.a.href} style={{marginLeft:"auto"}}><Button variant={3}>{post.a.title}</Button></Link> : <span/>}
                </div>
            </div>
        </div>) : <div/>}
        <div key={""}>
            <div className='step-label'>
                <label style={{padding:"10px",background:"#666",borderRadius:"50%"}}/>
                <h3 style={{color:"#666",margin:"5px"}}>User Created !</h3>
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
    const [posts, setPosts] = useState([]), {get} = GlobalState(), options = ["Mail", "WhatsApp"];

    useEffect(async() => {
        if(!lead || lead?.length !== 24) return;
        const logss = await get("crm/logs/"+lead+"?type=communication");
        setPosts([...posts, ...logss.logs]);
    }, [lead]);

    function getAnalytics(mails) {
        var mailCount = 0, waCount = 0;
        if(!mails.length) return { mailCount, waCount };
      
        mails.map(mail => {
          if (mail.type === 0) mailCount++;
          else if (mail.type === 1) waCount++;
        });
      
        return { mailCount, waCount };
      }
      

    return <><div style={{height:"fit-content",width:"100%",display:"flex", justifyContent:"space-around"}}>
        <h2 style={{fontFamily:"Poppins"}}>Email Statistics</h2>
        <div>
            <h4>Email Sent : {getAnalytics(posts)["mailCount"]}</h4>
        </div>
        <h2 style={{fontFamily:"Poppins",height:"95%",borderLeft:"3px dashed #666",paddingLeft:"15px"}}>WhatsApp Statistics</h2>
        <div>
            <h4>WhatsApp Sent : {getAnalytics(posts)["waCount"]}</h4>
        </div>
    </div>
        <div className="stepper-container-h">
            {posts.length ? posts.map((post,idx) => <div key={post._id}>
                <div className='step-label'>
                    <label style={{padding:"10px",background:"#666",borderRadius:"50%"}}/>
                    <h3 style={{color:"#666",margin:"5px"}}>{options[post.type]} Notification !</h3>
                </div>
                <div className={'step-content '+(posts.length === idx+1 ? "last-child" : "")}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{fontFamily:"Nunito",marginLeft:"auto",fontSize:15}}>{new Date(post?.createdAt).toLocaleString()}</span>
                        <p>{post?.description}</p>
                        {post?.a ? <Link to={post.a.href} style={{marginLeft:"auto"}}><Button variant={3}>{post.a.title}</Button></Link> : <span/>}
                    </div>
                </div>
            </div>) : <div/>}
        </div></>
}