import {useEffect, useState} from 'react';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import { Link } from 'react-router-dom';

export default function InstiManage() {
    const [leads, setLeads] = useState([]), {get,SERVER} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1);

    useEffect(async() => {
        const res = await get("institute/?page="+page);
        setLeads(res.institutes || []);
        setTotal(res.total || 0);
    }, [page])

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"97vw"}}>
            <Link to="/institute/new"><Button variant={4}><i className='fas fa-add'/> New Institute</Button></Link>
            <h2 style={{margin:"0 auto 0 15px"}}>Manage Your Institutes</h2>
            <Button variant={4} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Institutes of {total} Total</span>
            <Button variant={4} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        <div style={{display:"flex",flexDirection:"column",width:"75vw",flexWrap:"wrap",justifyContent:"center",margin:"0 10vw"}}>
            {leads.map(lead => <div style={{borderBottom:" 4px solid var(--background-ex2)",margin:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:'row',padding:"15px"}}>
                <img src={lead.icon || SERVER+"school.jpg"} alt="User pfp" style={{width:"60px",height:"60px",borderRadius:"15px",margin:"10px 0"}}/>
                <h3 style={{fontFamily:"Poppins",margin:"5px 0",minWidth:"30vw",maxWidth:"30vw"}}>{lead.name}</h3>
                <h4 style={{minWidth:"30vw",maxWidth:"30vw"}}>{lead.email}</h4>
                <Link to={"/institute/"+lead._id}><Button variant={2} style={{padding:"8px 12px",margin:0}}>Manage</Button></Link>
            </div>)}
        </div>
    </div>
}