import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Select from '../../../components/select';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import { CRMHeader } from './dashboard';

export default function Leads() {
    const [leads, setLeads] = useState([]), [filter, setFilter] = useState(false), [selected, setSelected] = useState([]), {get, SERVER} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1);
    const [prop, setProp] = useState(0),[value, setValue] = useState(""), [statuses, setStatuses] = useState([]);


    useEffect(async() => {
        const query = (filter ? ("&prop="+prop+"&value="+value) : "");

        const res = await get("crm/leads?page="+page+query);

        setLeads(res.leads || []);
        setTotal(res.total || 0);
        
        const reqq = await get("static/lead-status");
        setStatuses(reqq.options);
    }, [page, filter, prop, value])

    const scoreColor = (score) => {
        var color = "#bf0000";

        if(score > 50) color = "#ffd300";
        if(score > 70) color = "#f58216";
        if(score > 80) color = "#08f26e";
        if(score > 90) color = "#059142";

        return <span style={{fontSize:"20px",color,fontWeight:"bold"}}>{score}</span>
    }, revSelected = (item) => {
        var idx = selected.indexOf(item), temp = selected;

        if(idx === -1) return setSelected([...selected, item]);

        temp.splice(idx, 1);
        return setSelected([...temp]);
    }, upload = () => {
        Swal.fire({
            title:"Do you want to upload Leads on the CRM?",
            html:`<h4>We accept only .XLSX files. Additionally please adhere to the Column Settings.</h4>
            <ul style="text-align:left">
                <li>Column A - Sr. No.</li>
                <li>Column B - Name of Lead</li>
                <li>Column C - Email of Lead</li>
                <li>Column D - Phone Number of Lead</li>
                <li>Column E - Registration Date (format:'dd/mm/yy', time will be taken as 12:00pm)</li>
            </ul>
            <h4>Other details such as Relationship Manager shall be filled afterwards.</h4>`,
            footer:"Registration Campaign will taken as 'Walk-in'",
            confirmButtonText:"Proceed to Upload",
            confirmButtonColor:"#1972d6"
        }).then(async(res) => {
            if(!res.isConfirmed) return;

            document.getElementById("uploadXLSX").click();
        })
    }, uploadXLSX = (e) => {
        const file = e.target.files[0];

        if(!file) return;
    
        if(!file.name.includes(".xlsx")) return toast("We accept only valid XLSX files.");

        toast("Processing", 1);
    }, downloadXLSX = async(e) => {
        if(!selected.length) return;
    
        toast("Downloading file !", 3);
        const report = await get("crm/download?leads="+selected.join(","));

        if(report.id) return window.open(SERVER + "temp/" + report.id + "/leads.xlsx");
        return toast("Error in Parsing file !");
    }, setLeadStage = async(lead, status) => {
        const req = await get("crm/lead/status?id="+lead._id+"&status="+status);
        var leadss = [];

        leads.map(leade => leadss.push(leade._id === lead._id ?{...leade, status} : leade))

        if(req.success) return setLeads(leadss);
        return toast("Error in Lead Stage Change !");
    }

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"var(--gradient)"}}>
        <CRMHeader/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"93vw"}}>
            <input id="uploadXLSX" style={{display:"none"}} type="file" accept='.xlsx' onChange={uploadXLSX}/>
            {selected.length ? <>
                <Button variant={1} onClick={downloadXLSX}><i className='fas fa-download'/></Button>
                <h4>{selected.length} Lead{selected.length-1 ? "s" : ""} Selected</h4>
                <Button variant={2} onClick={()=>setSelected([])}><i className='fas fa-x'/></Button>
            </> : <><Button variant={2} onClick={upload}><i className='fas fa-upload'/></Button>
            <Button variant={3} onClick={()=>setFilter(!filter)}><i className='fas fa-filter'/></Button>
            <Link to="/crm/settings"><Button variant={1}><i className='fas fa-gears'/></Button></Link></>}
            <h2 style={{margin:"0 auto"}}>Lead Manager</h2>
            <Button variant={2} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Leads of {total} {filter ? "Found" : "Total"}</span>
            <Button variant={2} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        {filter ? <Filter setProp={setProp} setValue={setValue} leadStages={statuses}/> : <div/>}
        <table style={{marginBottom:"40px"}}>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Lead Name</th>
                    <th>Registered Email</th>
                    <th>Source</th>
                    <th>Registration Date <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                    <th>Lead Type</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {leads.length ? leads.map(lead => <tr style={{height:"80px"}}>
                    <td><label className="checkbox" style={{margin:0, display:"initial"}}>
                        <input type="checkbox" checked={selected.includes(lead._id)} onChange={()=>revSelected(lead._id)}/>
                        <span className="checkmark"/>
                    </label></td>
                    <td><Link to={"/crm/lead/"+lead._id}><Button variant={2} style={{padding:"8px 12px",margin:0}}>{lead.name}</Button></Link></td>
                    <td>{lead?.email}</td>
                    <td>{lead?.utm?.source || "Organic"}</td>
                    <td>{new Date(lead?.createdAt).toLocaleString()}</td>
                    <td><Select def="Lead Stage" value={lead?.status || 0} setOption={val=>setLeadStage(lead, val)} style={{width:"10vw",height:"1em",fontSize:"14px"}} divMargin={0} options={statuses}/></td>
                    <td>{scoreColor(lead?.score || 0)}</td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td></tr>;
}

function Filter({setProp, setValue, leadStages}){
    const [option, setOption] = useState(0), [name, setName] = useState(""), [email, setEmail] = useState(""), [date, setDate] = useState(""), [date2, setDate2] = useState(""), [status, setStatus] = useState(0), [score, setScore] = useState(0);

    const inputs = [
        <Input label="Name" type="text" style={{width:"300px"}} value={name} onChange={setName}/>,
        <Input label="Email" type="text" style={{width:"300px"}} value={email} onChange={setEmail}/>,
        <><Input label="Start Date" type="date" format="dd-mm-yy" style={{width:"300px"}} value={date} onChange={setDate}/><Input label="End Date" type="date" format="dd-mm-yy" style={{width:"300px"}} value={date2} onChange={setDate2}/></>,
        <Select label="Lead Status" def="Lead Status" style={{width:"300px"}} value={status} setOption={setStatus} options={leadStages}/>,
        <Select label="Score" def="Score" style={{width:"300px"}} value={score} setOption={setScore} options={["0 to 50","51 to 70","71 to 80","81 to 90","91 to 100"]} oav/>
    ], setters = [name, email, date+"/slash/"+date2, status, score];

    useEffect(() => {
      setProp(option);
      setValue(setters[option]);
    }, [option, name, email, date, date2, status, score])
    
    return <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"93vw"}}>
        <Select label="Filter By" def="Option" style={{width:"15vw"}} value={option} setOption={setOption} options={["Name", "Email", "Registration Date", "Lead Type", "Score"]}/>
        {inputs[option]}
    </div>
}
