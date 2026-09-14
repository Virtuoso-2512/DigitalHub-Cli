import {useEffect, useState} from 'react';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import { Link } from 'react-router-dom';

export default function DepartmentManage() {
    const [leads, setLeads] = useState([]), {get} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1);

    useEffect(async() => {
        const res = await get("department/?page="+page);
        setLeads(res.departments || []);
        setTotal(res.total || 0);
    }, [page]);

    const dept = ["Teaching (Staff & Students)", "Non-Teaching (Staff Only)"];

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"97vw"}}>
            <Link to="/department/new"><Button variant={4}><i className='fas fa-add'/> New Department</Button></Link>
            <h2 style={{margin:"0 auto 0 10px"}}>Manage Your Departments</h2>
            <Button variant={4} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Departments of {total} Total</span>
            <Button variant={4} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        <table style={{margin:"30px 0",width:"80%"}}>
            <thead>
                <tr>
                    <th>Department Name <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                    <th>Department Type</th>
                </tr>
            </thead>
            <tbody>
                {leads.length ? leads.map(lead => <tr style={{height:"80px"}}>
                    <td><Link to={"/department/"+lead._id}><Button variant={6} style={{padding:"8px 12px",fontSize:16,margin:0}}>{lead.name}</Button></Link></td>
                    <td>{dept[lead?.type]}</td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}><td><h1 className="loader"/></td><td><h1 className="loader"/></td></tr>;
}