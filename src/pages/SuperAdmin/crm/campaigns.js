import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Select from '../../../components/select';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import { CRMHeader } from './dashboard';
import Popup from '../../../components/Popup';

export default function Campaigns() {
    const [leads, setLeads] = useState([]), {get} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1), [statuses, setStatuses] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(async() => {
        const res = await get("crm/campaigns?page="+page);

        setLeads(res.campaigns || []);
        setTotal(res.total || 0);
        
        const reqq = await get("static/lead-status");
        setStatuses(reqq.options);
    }, [page])

    const scoreColor = (score) => {
        var color = "#bf0000";

        if(score > 50) color = "#ffd300";
        if(score > 70) color = "#f58216";
        if(score > 80) color = "#08f26e";
        if(score > 90) color = "#059142";

        return <span style={{fontSize:"20px",color,fontWeight:"bold"}}>{score}</span>
    }, setLeadStage = async(lead, status) => {
        const req = await get("crm/lead/status?id="+lead._id+"&status="+status);
        var leadss = [];

        leads.map(leade => leadss.push(leade._id === lead._id ?{...leade, status} : leade))

        if(req.success) return setLeads(leadss);
        return toast("Error in Lead Stage Change !");
    }

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"var(--gradient)"}}>
        <CRMHeader/>
        <Popup open={open} setOpen={setOpen} title="New Campaign">
            <NewCampaign/>
        </Popup>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"93vw"}}>
            <Button variant={3} onClick={()=>setOpen(true)}><i className='fas fa-plus'/> Add Campaign</Button>
            <h2 style={{margin:"0 auto"}}>Campaign Manager</h2>
            <Button variant={2} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Campaign of {total} Total</span>
            <Button variant={2} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        <table style={{marginBottom:"40px"}}>
            <thead>
                <tr>
                    <th>Campaign Name</th>
                    <th>Creation Date <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                    <th>Institute</th>
                    <th>Disabled</th>
                </tr>
            </thead>
            <tbody>
                {leads.length ? leads.map(lead => <tr style={{height:"80px"}}>
                    <td><Link to={"/crm/lead/"+lead._id}><Button variant={2} style={{padding:"8px 12px",margin:0}}>{lead.name}</Button></Link></td>
                    <td>{lead?.email}</td>
                    <td>{lead?.utm?.source || "Organic"}</td>
                    <td>{new Date(lead?.createdAt).toLocaleString()}</td>
                    <td>{scoreColor(lead?.score || 0)}</td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>
}

function NewCampaign(){
    const {get} = GlobalState(),[ndame, setName] = useState(""), [insti, setInsti] = useState(""), [options, setOptions] = useState([]);

    useEffect(async() => {
        const res = await get("../crm/institutes");
        setOptions([{_id:-1, name:"All Institutes"}, ...res.institutes])
    }, [])

    const submit = async() => {

    }

    return <div>
        <Input id="name" label="Campaign Name" value={ndame} onChange={setName}/>
        <Select label="Select Institute" def="Institute" value={insti} setOption={setInsti} options={options} unique/>
        <Button variant={1} onClick={submit}>Create Campaign</Button>
    </div>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td></tr>;
}