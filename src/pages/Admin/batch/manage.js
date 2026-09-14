import {useEffect, useState} from 'react';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import { Link } from 'react-router-dom';

export default function BatchManage() {
    const [leads, setLeads] = useState([]), {get} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1);

    useEffect(async() => {
        const res = await get("batch/?page="+page);
        setLeads(res.batches || []);
        setTotal(res.total || 0);
    }, [page]);

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"97vw"}}>
            <Link to="/batch/new"><Button variant={4}><i className='fas fa-add'/> New batch</Button></Link>
            <h2 style={{margin:"0 auto 0 10px"}}>Manage Your Batches</h2>
            <Button variant={4} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} batches of {total} Total</span>
            <Button variant={4} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        <table style={{margin:"30px 0",width:"80%"}}>
            <thead>
                <tr>
                    <th>Batch Name <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                    <th>Batch Department</th>
                    <th>Batch Manager</th>
                </tr>
            </thead>
            <tbody>
                {leads.length ? leads.map(lead => <tr style={{height:"80px"}}>
                    <td><Link to={"/batch/"+lead._id}><Button variant={6} style={{padding:"8px 12px",fontSize:16,margin:0}}>{lead.name}</Button></Link></td>
                    <td>{lead?.department?.name || "Not Allocated"}</td>
                    <td>{lead?.manager?.name || "Not Allocated"}</td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td></tr>;
}